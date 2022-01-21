import { TicTacToePlayer } from 'player/TicTacToePlayer';

/**
 * The representation of a TicTacToe move.
 */
export class TicTacToeMove {
	/**
	 * Constructs a new TicTacToeMove with the given row, column and player.
	 *
	 * @param row The row of the move.
	 * @param col The column of the move.
	 * @param player The player of the move.
	 */
	public constructor(private row: number, private col: number, private player: TicTacToePlayer) {}

	/**
	 * Returns the row of the move.
	 */
	public getRow() {
		return this.row;
	}

	/**
	 * Returns the column of the move.
	 */
	public getCol() {
		return this.col;
	}

	/**
	 * Returns the player of the move.
	 */
	public getPlayer() {
		return this.player;
	}
}
