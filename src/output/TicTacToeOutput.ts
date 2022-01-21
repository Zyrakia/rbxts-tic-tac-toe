import { TicTacToeGame } from 'TicTacToeGame';

/**
 * The interface for a TicTicToeGame output handler.
 */
export interface TicTacToeOutput {
	/**
	 * Called whenever a move is made in the given game.
	 *
	 * @param tttGame The game that was updated.
	 */
	onMove?(tttGame: TicTacToeGame): void;

	/**
	 * Called whenever a game ends for any reason.
	 *
	 * @param tttGame The game that ended.
	 */
	onGameOver?(tttGame: TicTacToeGame): void;

	/**
	 * Called whenever a game is started.
	 *
	 * @param tttGame The game that was started.
	 */
	onGameStart?(tttGame: TicTacToeGame): void;
}
