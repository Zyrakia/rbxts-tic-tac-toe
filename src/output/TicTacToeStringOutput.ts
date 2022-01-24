import { TicTacToeSymbol } from 'enum/TicTacToeSymbol';
import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToeGame } from 'TicTacToeGame';
import { TicTacToeOutput } from './TicTacToeOutput';

/**
 * A output handler that converts the game into a string grid.
 * This is mainly for example purposes of use cases for an output handler.
 */
export class TicTacToeStringOutput implements TicTacToeOutput {
	/**
	 * Constructs a new TicTacToeStringOutput.
	 *
	 * @param sep The string to use to outline the grid and separate cells.
	 * @param channel The channel to output to.
	 */
	public constructor(private sep = '#', private channel: (res: string) => void) {}

	/** @hidden */
	public onMove(tttGame: TicTacToeGame) {
		this.output(tttGame);
	}

	/** @hidden */
	public onGameOver(tttGame: TicTacToeGame) {
		this.output(tttGame);
	}

	/** @hidden */
	public onGameStart(tttGame: TicTacToeGame) {
		this.output(tttGame);
	}

	/**
	 * Constructs a string representation of the given game
	 * and outputs it to the channel.
	 *
	 * @param tttGame The game to output.
	 */
	private output(tttGame: TicTacToeGame) {
		this.channel(this.constructBoardLines(tttGame.getBoard()).join('\n'));
	}

	/**
	 * Constructs a string representation of the given board.
	 *
	 * @param board The board to output.
	 * @returns An array of lines representing the board lines.
	 */
	private constructBoardLines(board: TicTacToeBoard) {
		const lines: string[] = [this.sep.rep(13)];

		for (let row = 0; row < 3; row++) {
			const cells = board.getRow(row);

			let s = '';

			cells.forEach((cell) => {
				s += `${this.sep} ${this.getSymbolString(cell.getSymbol())} `;
			});

			s += `${this.sep}`;

			lines.push(s);
		}

		lines.push(this.sep.rep(13));
		return lines;
	}

	/**
	 * Returns a string representation of the given symbol.
	 */
	private getSymbolString(symbol: TicTacToeSymbol) {
		return !symbol ? ' ' : symbol;
	}
}
