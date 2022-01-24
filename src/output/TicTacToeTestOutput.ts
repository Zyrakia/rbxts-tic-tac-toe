import { TicTacToeState } from 'index';
import { TicTacToeGame } from 'TicTacToeGame';
import { TicTacToeOutput } from './TicTacToeOutput';

/**
 * Output used in testing this library, has no actual
 * useful functionality.
 */
export class TicTacToeTestOutput implements TicTacToeOutput {
	private movesMade = 0;
	private gamesStarted = 0;
	private gamesEnded = 0;
	private xWins = 0;
	private oWins = 0;
	private draws = 0;

	public onMove() {
		this.movesMade++;
	}

	public onGameOver(g: TicTacToeGame) {
		this.gamesEnded++;

		const state = g.getState();
		if (state === TicTacToeState.DRAW) this.draws++;
		else if (state === TicTacToeState.X_WON) this.xWins++;
		else if (state === TicTacToeState.O_WON) this.oWins++;
	}

	public onGameStart() {
		this.gamesStarted++;
	}

	public getMovesMade() {
		return this.movesMade;
	}

	public getGamesStarted() {
		return this.gamesStarted;
	}

	public getGamesEnded() {
		return this.gamesEnded;
	}

	public getXWins() {
		return this.xWins;
	}

	public getOWins() {
		return this.oWins;
	}

	public getDraws() {
		return this.draws;
	}
}
