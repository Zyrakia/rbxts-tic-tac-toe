import { TicTacToeMoveResult } from 'enum/TicTacToeMoveResult';
import { TicTacToeState } from 'enum/TicTacToeState';
import { TicTacToeSymbol } from 'enum/TicTacToeSymbol';
import { TicTacToeOutput } from 'output/TicTacToeOutput';
import { TicTacToePlayer } from 'player/TicTacToePlayer';
import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToeCell } from 'TicTacToeCell';
import { TicTacToeMove } from 'TicTacToeMove';

/**
 * The game of TicTacToe.
 *
 * @template X The type of the player that plays the X symbol.
 * @template O The type of the player that plays the O symbol, defaults to X.
 */
export class TicTacToeGame<
	X extends TicTacToePlayer = TicTacToePlayer,
	O extends TicTacToePlayer = X,
> {
	/** The board used in this game. */
	private board = new TicTacToeBoard();

	/** The outputs that the game announces to. */
	private outputs: TicTacToeOutput<TicTacToeGame<X, O>>[];

	/** The player that is responsible for making the next move. */
	private currentPlayer: X | O;

	/** The current state of the game. */
	private state = TicTacToeState.IN_PROGRESS;

	/** The current winner of the game, if there is one. */
	private winner?: X | O;

	/** The current winning cells if there are any. */
	private winningCells?: TicTacToeCell[];

	/** The last move that was made, if there is one. */
	private lastMove?: TicTacToeMove;

	/**
	 * Constructs a new TicTacToeGame.
	 *
	 * @param playerX The player that plays the X symbol.
	 * @param playerO The player that plays the O symbol.
	 * @param firstPlayer The symbol of the player that will start, or omit to choose randomly.
	 * @param outputs The outputs that the game announces to.
	 */
	public constructor(
		private playerX: X,
		private playerO: O,
		firstPlayer: TicTacToeSymbol = TicTacToeSymbol.EMPTY,
		...outputs: TicTacToeOutput<TicTacToeGame<X, O>>[]
	) {
		this.currentPlayer = this.getPlayerFromSymbol(firstPlayer);
		this.outputs = outputs;
		this.outputs.forEach((output) => output.onGameStart?.(this));
	}

	/**
	 * Requests a move from the current player and handles the result.
	 * If the game is in any state except in progress, this method
	 * does nothing.
	 *
	 * If the player does not return a move, the game will be cancelled. Otherwise,
	 * the move is verified and registered, any state changes are recorded, and
	 * the current player is changed.
	 *
	 * @returns The result of the move.
	 */
	public nextMove() {
		if (this.isOver()) return TicTacToeMoveResult.GAME_UNAVAILABLE;

		const moveLocation = this.currentPlayer.makeMove(this.board, this.getCurrentPlayerSymbol());
		if (!moveLocation) {
			this.cancel();
			return TicTacToeMoveResult.NO_RESPONSE;
		}

		const move = new TicTacToeMove(moveLocation.row, moveLocation.col, this.currentPlayer);

		if (!this.board.isValidMove(move)) return TicTacToeMoveResult.INVALID;

		const cell = new TicTacToeCell(move.getRow(), move.getCol(), this.getCurrentPlayerSymbol());
		this.board.setCell(cell);

		this.handleMoveMade(move);
		this.currentPlayer = this.getNextPlayer();
		return TicTacToeMoveResult.SUCCESS;
	}

	/**
	 * Returns the symbol representing the current player.
	 */
	public getCurrentPlayerSymbol(): Exclude<TicTacToeSymbol, TicTacToeSymbol.EMPTY> {
		return this.currentPlayer === this.playerX ? TicTacToeSymbol.X : TicTacToeSymbol.O;
	}

	/**
	 * Handles any effects of the specified move.
	 *
	 * This checks the current state of the board,
	 * and sets the games state and variables accordingly.
	 * This will also announce to the outputs.
	 *
	 * @param move The move that was made.
	 */
	private handleMoveMade(move: TicTacToeMove) {
		const [state, winningCells] = this.board.getCurrentState();

		this.state = state;
		this.winningCells = winningCells;

		if (state === TicTacToeState.X_WON) {
			this.winner = this.playerX;
		} else if (state === TicTacToeState.O_WON) this.winner = this.playerO;

		this.lastMove = move;

		this.outputs.forEach((output) => output.onGameOver?.(this));
		this.outputs.forEach((output) => output.onMove?.(this));
	}

	/**
	 * Cancels the game, if the game is in progress.
	 */
	public cancel() {
		if (this.isOver()) return;
		this.state = TicTacToeState.CANCELLED;
		this.outputs.forEach((output) => output.onGameOver?.(this));
	}

	/**
	 * Returns the player that is responsible for making the next move.
	 */
	public getNextPlayer() {
		return this.currentPlayer === this.playerX ? this.playerO : this.playerX;
	}

	/**
	 * Returns a random player of the two players.
	 */
	private getRandomPlayer() {
		const r = new Random();
		return r.NextNumber() > 0.5 ? this.playerX : this.playerO;
	}

	/**
	 * Returns the player specified with the specified symbol,
	 * or a random player if the symbol is {@link TicTacToeSymbol.EMPTY}
	 */
	private getPlayerFromSymbol(symbol: TicTacToeSymbol) {
		return symbol === TicTacToeSymbol.X
			? this.playerX
			: symbol === TicTacToeSymbol.O
			? this.playerO
			: this.getRandomPlayer();
	}

	/**
	 * Resets the game. This will clear the board,
	 * reset the current player and state.
	 *
	 * This will also announce to the outputs that a new game has started.
	 * This will NOT announce that a game has ended, as this is not meant
	 * to be used to end a game, for that use {@link cancel}.
	 */
	public reset(firstPlayer = TicTacToeSymbol.EMPTY) {
		this.board = new TicTacToeBoard();
		this.currentPlayer = this.getPlayerFromSymbol(firstPlayer);
		this.state = TicTacToeState.IN_PROGRESS;
		this.winningCells = undefined;
		this.winner = undefined;
		this.lastMove = undefined;

		this.outputs.forEach((output) => output.onGameStart?.(this));
	}

	/**
	 * Returns the current player.
	 */
	public getCurrentPlayer() {
		return this.currentPlayer;
	}

	/**
	 * Returns whether the game is in any state except in progress.
	 */
	public isOver() {
		return this.state !== TicTacToeState.IN_PROGRESS;
	}

	/**
	 * Returns the current state of the game.
	 */
	public getState() {
		return this.state;
	}

	/**
	 * Returns the board of the game.
	 */
	public getBoard() {
		return this.board;
	}

	/**
	 * Returns a copy of the game's board.
	 */
	public getBoardCopy() {
		return new TicTacToeBoard(this.board.getCells());
	}

	/**
	 * Returns the last move that was made.
	 */
	public getLastMove() {
		return this.lastMove;
	}

	/**
	 * Returns the current winner, if any.
	 */
	public getWinner() {
		return this.winner;
	}

	/**
	 * Returns the current winning cells, if any.
	 */
	public getWinningCells() {
		return this.winningCells;
	}

	/**
	 * Returns the player representing the X symbol.
	 */
	public getPlayerX() {
		return this.playerX;
	}

	/**
	 * Returns the player representing the O symbol.
	 */
	public getPlayerO() {
		return this.playerO;
	}

	/**
	 * Add outputs to the game.
	 * These will be addressed whenever a significant event occurs.
	 *
	 * @param output The output to add.
	 */
	public addOutputs(...outputs: TicTacToeOutput<TicTacToeGame<X, O>>[]) {
		this.outputs = [...this.outputs, ...outputs];
	}

	/**
	 * Removes an output from the game.
	 */
	public removeOutput(output: TicTacToeOutput) {
		const i = this.outputs.indexOf(output);
		if (i === -1) return;
		this.outputs.remove(i);
	}

	/**
	 * Returns the outputs of the game.
	 */
	public getOutputs() {
		return this.outputs;
	}
}
