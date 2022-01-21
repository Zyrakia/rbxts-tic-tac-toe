import { TicTacToeSymbol } from 'enum/TicTacToeSymbol';

/**
 * The representation of a TicTacToe cell.
 */
export class TicTacToeCell {
	/**
	 * Constructs a new TicTacToeCell with the given row, column and symbol.
	 *
	 * @param row The row of the cell.
	 * @param col The column of the cell.
	 * @param symbol The symbol of the cell.
	 */
	public constructor(private row: number, private col: number, private symbol: TicTacToeSymbol) {}

	/**
	 * Constructs an empty TicTacToeCell with the given row and column.
	 *
	 * @param row The row of the cell.
	 * @param col The column of the cell.
	 * @returns The empty TicTacToeCell.
	 */
	public static empty(row: number, col: number) {
		return new TicTacToeCell(row, col, TicTacToeSymbol.EMPTY);
	}

	/**
	 * Returns whether the cell is empty.
	 */
	public isEmpty() {
		return this.symbol === TicTacToeSymbol.EMPTY;
	}

	/**
	 * Returns the row of the cell.
	 */
	public getRow() {
		return this.row;
	}

	/**
	 * Returns the column of the cell.
	 */
	public getCol() {
		return this.col;
	}

	/**
	 * Returns the symbol of the cell.
	 */
	public getSymbol() {
		return this.symbol;
	}
}
