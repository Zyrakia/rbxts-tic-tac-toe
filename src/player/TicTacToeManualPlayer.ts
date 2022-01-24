import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToePlayer } from './TicTacToePlayer';

/**
 * A player that makes a move depending on the move set
 * externally, or randomly if desired and no move is set.
 */
export class TicTacToeManualPlayer extends TicTacToePlayer {
	/** The next move that the player should make. */
	private nextMove?: { row: number; col: number };

	/**
	 * Constructs a new TicTacToeManualPlayer.
	 *
	 * @param name The name of the player.
	 * @param alwaysHaveMove Whether the player should chose a random move if no move is set. Defaults to true.
	 */
	public constructor(name: string, private alwaysHaveMove = true) {
		super(name);
	}

	/** @hidden */
	public makeMove(board: TicTacToeBoard) {
		if (this.nextMove) {
			const move = this.nextMove;
			this.nextMove = undefined;
			return move;
		}

		if (this.alwaysHaveMove) return this.getRandom(board);
	}

	/**
	 * Returns a random move based on empty cells on the given board.
	 *
	 * @param board The board to get a random move from.
	 * @returns The random move.
	 */
	private getRandom(board: TicTacToeBoard) {
		const emptyCells = board.getEmptyCells();
		const randomCell = emptyCells[math.floor(math.random() * emptyCells.size())];
		return { row: randomCell.getRow(), col: randomCell.getCol() };
	}

	/**
	 * Sets the coordinates of the next move
	 * that the player should make. This
	 * will be cleared after the next move.
	 *
	 * @param row The row of the next move.
	 * @param col The column of the next move.
	 */
	public setNext(row: number, col: number) {
		this.nextMove = { row, col };
	}
}
