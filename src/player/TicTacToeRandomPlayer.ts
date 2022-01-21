import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToeMove } from 'TicTacToeMove';
import { TicTacToePlayer } from './TicTacToePlayer';

/**
 * A player that makes a random move depending on the empty
 * cells on the board. This is mainly for example purposes
 * of how to create a player.
 */
export class TicTacToeRandomPlayer extends TicTacToePlayer {
	/** @hidden */
	public makeMove(board: TicTacToeBoard): TicTacToeMove {
		const emptyCells = board.getEmptyCells();
		const randomCell = emptyCells[math.floor(math.random() * emptyCells.size())];
		return new TicTacToeMove(randomCell.getRow(), randomCell.getCol(), this);
	}
}
