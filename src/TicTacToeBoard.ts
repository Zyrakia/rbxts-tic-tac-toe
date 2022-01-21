import { TicTacToeState } from 'enum/TicTacToeState';
import { TicTacToeSymbol } from 'enum/TicTacToeSymbol';
import { TicTacToeCell } from 'TicTacToeCell';
import { TicTacToeMove } from 'TicTacToeMove';

/**
 * The representation of a TicTacToe board.
 */
export class TicTacToeBoard {
	/** The array representation of the board cells. */
	private board: TicTacToeCell[];

	/**
	 * Constructs a new TicTacToeBoard with the given cells.
	 *
	 * @param board The cells to use, these will be copied.
	 */
	public constructor(board?: TicTacToeCell[]) {
		this.board = board
			? board.map((cell) => {
					return new TicTacToeCell(cell.getRow(), cell.getCol(), cell.getSymbol());
			  })
			: TicTacToeBoard.empty();
	}

	/**
	 * Returns the cell at the specified coordinates.
	 *
	 * @param row The row of the cell.
	 * @param col The column of the cell.
	 * @returns The cell at the specified coordinates.
	 */
	public getCell(row: number, col: number) {
		return this.board.find((cell) => cell.getRow() === row && cell.getCol() === col);
	}

	/**
	 * Returns the cells of the specified row.
	 *
	 * @param row The row to get the cells of.
	 * @returns The cells of the specified row.
	 */
	public getRow(row: number) {
		return this.board.filter((cell) => cell.getRow() === row);
	}

	/**
	 * Returns the cells of the specified column.
	 *
	 * @param col The column to get the cells of.
	 * @returns The cells of the specified column.
	 */
	public getCol(col: number) {
		return this.board.filter((cell) => cell.getCol() === col);
	}

	/**
	 * Returns the cells of the left to right diagonal.
	 */
	public getFirstDiagonal() {
		return this.board.filter((cell) => cell.getRow() === cell.getCol());
	}

	/**
	 * Returns the cells of the right to left diagonal.
	 */
	public getSecondDiagonal() {
		return this.board.filter((cell) => cell.getRow() === 2 - cell.getCol());
	}

	/**
	 * Inserts the specified cell into the board.
	 * This will overwrite any existing cell with the
	 * same coordinates.
	 *
	 * @param cell The cell to insert.
	 */
	public setCell(cell: TicTacToeCell) {
		const index = this.board.findIndex((c) => {
			return c.getRow() === cell.getRow() && c.getCol() === cell.getCol();
		});

		this.board[index] = cell;
	}

	/**
	 * Runs over the board and checks if any state conditions are met.
	 * If a win state is met, the state is returned with the winning cells.
	 * Otherwise the state is returned with undefined.
	 *
	 * This checks in the order of rows (top to bottom), columns (left to right), diagonals (first then second).
	 *
	 * @returns The state of the game and the winning cells if applicable.
	 */
	public getCurrentState(): [TicTacToeState, TicTacToeCell[] | undefined] {
		if (this.isEmpty()) return [TicTacToeState.IN_PROGRESS, undefined];

		const lines = [
			this.getRow(0),
			this.getRow(1),
			this.getRow(2),
			this.getCol(0),
			this.getCol(1),
			this.getCol(2),
			this.getFirstDiagonal(),
			this.getSecondDiagonal(),
		];

		for (const cells of lines) {
			const symbol = cells[0].getSymbol();
			if (symbol === TicTacToeSymbol.EMPTY) continue;
			if (!cells.every((cell) => cell.getSymbol() === symbol)) continue;

			if (symbol === TicTacToeSymbol.X) return [TicTacToeState.X_WON, cells];
			if (symbol === TicTacToeSymbol.O) return [TicTacToeState.O_WON, cells];
		}

		if (this.isFull()) return [TicTacToeState.DRAW, undefined];

		return [TicTacToeState.IN_PROGRESS, undefined];
	}

	/**
	 * Returns the cells on the board that are empty.
	 */
	public getEmptyCells() {
		return this.board.filter((cell) => cell.isEmpty());
	}

	/**
	 * Returns whether all the cells on the board are empty.
	 */
	public isEmpty() {
		return this.board.every((cell) => cell.isEmpty());
	}

	/**
	 * Returns whether all the cells on the board are full.
	 */
	public isFull() {
		return this.board.every((cell) => !cell.isEmpty());
	}

	/**
	 * Returns whether the specified move is valid.
	 *
	 * @param move The move to check.
	 */
	public isValidMove(move: TicTacToeMove) {
		return this.getCell(move.getRow(), move.getCol())?.isEmpty() ?? false;
	}

	/**
	 * Returns the cells of the board.
	 */
	public getCells() {
		return this.board;
	}

	/**
	 * Returns a board with all the cells empty.
	 */
	public static empty() {
		return [
			TicTacToeCell.empty(0, 0),
			TicTacToeCell.empty(0, 1),
			TicTacToeCell.empty(0, 2),
			TicTacToeCell.empty(1, 0),
			TicTacToeCell.empty(1, 1),
			TicTacToeCell.empty(1, 2),
			TicTacToeCell.empty(2, 0),
			TicTacToeCell.empty(2, 1),
			TicTacToeCell.empty(2, 2),
		];
	}
}
