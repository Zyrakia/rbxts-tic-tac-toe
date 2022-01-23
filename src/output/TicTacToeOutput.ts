import { TicTacToeGame } from 'TicTacToeGame';

/**
 * The interface for a TicTicToeGame output handler.
 *
 * @template Game The type of TicTacToeGame to use.
 */
export interface TicTacToeOutput<Game extends TicTacToeGame = TicTacToeGame> {
	/**
	 * Called whenever a move is made in the given game.
	 * This is called before the player is switched.
	 *
	 * @param tttGame The game that was updated.
	 */
	onMove?(tttGame: Game): void;

	/**
	 * Called whenever a game ends for any reason.
	 *
	 * @param tttGame The game that ended.
	 */
	onGameOver?(tttGame: Game): void;

	/**
	 * Called whenever a game is started.
	 *
	 * @param tttGame The game that was started.
	 */
	onGameStart?(tttGame: Game): void;
}
