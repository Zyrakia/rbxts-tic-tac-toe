import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToePlayer } from './TicTacToePlayer';

/**
 * A player that makes a random move depending on the empty
 * cells on the board. This is mainly for example purposes
 * of how to create a player.
 */
export class TicTacToeRandomPlayer extends TicTacToePlayer {
	/** @hidden */
	public makeMove(board: TicTacToeBoard) {
		const emptyCells = board.getEmptyCells();
		const randomCell = emptyCells[math.floor(math.random() * emptyCells.size())];
		return { row: randomCell.getRow(), col: randomCell.getCol() };
	}
}
