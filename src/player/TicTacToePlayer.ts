import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToeMove } from 'TicTacToeMove';

/**
 * The base class for a TicTacToe player.
 */
export abstract class TicTacToePlayer {
	/**
	 * Constructs a new TicTacToePlayer.
	 *
	 * @param name The name of the player.
	 */
	public constructor(private name: string) {}

	/**
	 * Asks the player to make a move based on the given board.
	 *
	 * @param board The board to make a move on.
	 * @returns The move the player made, or undefined if the game should be cancelled.
	 */
	public abstract makeMove(board: TicTacToeBoard): TicTacToeMove | undefined;

	/**
	 * Returns the name of this player.
	 */
	public getName() {
		return this.name;
	}
}
