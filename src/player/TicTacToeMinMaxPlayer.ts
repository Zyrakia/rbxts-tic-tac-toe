import { TicTacToeState } from 'enum/TicTacToeState';
import { TicTacToeSymbol } from 'enum/TicTacToeSymbol';
import { TicTacToeBoard } from 'TicTacToeBoard';
import { TicTacToeCell } from 'TicTacToeCell';
import { TicTacToePlayer } from './TicTacToePlayer';

interface MoveDescriptor {
	row?: number;
	col?: number;
	score: number;
}

export class TicTacToeMinMaxPlayer extends TicTacToePlayer {
	public constructor(name: string, private maxDepth = math.huge) {
		super(name);
	}

	public makeMove(
		board: TicTacToeBoard,
		ownSymbol: Exclude<TicTacToeSymbol, TicTacToeSymbol.EMPTY>,
	) {
		const { row, col } = this.minMax(board, ownSymbol, math.abs(this.maxDepth));
		if (row === undefined || col === undefined) return;
		return { row, col };
	}

	private minMax(
		board: TicTacToeBoard,
		winSymbol: Exclude<TicTacToeSymbol, TicTacToeSymbol.EMPTY>,
		maxDepth: number,
	): MoveDescriptor {
		const [state] = board.getCurrentState();

		switch (state) {
			case TicTacToeState.X_WON:
				return winSymbol === TicTacToeSymbol.X ? { score: 1 } : { score: -1 };
			case TicTacToeState.O_WON:
				return winSymbol === TicTacToeSymbol.O ? { score: 1 } : { score: -1 };
			case TicTacToeState.DRAW:
				return { score: 0 };
		}

		if (maxDepth <= 0) return { score: 0 };

		const emptyCells = board.getEmptyCells();

		const movesMade = [];
		for (const cell of emptyCells) {
			const [row, col] = [cell.getRow(), cell.getCol()];
			const move = { row, col, score: 0 };

			board.setCell(new TicTacToeCell(row, col, winSymbol));

			const res = this.minMax(board, this.getNextSymbol(winSymbol), maxDepth - 1);
			move.score = res.score;
			movesMade.push(move);
		}

		let bestMove;
		if (winSymbol === TicTacToeSymbol.X) {
			bestMove = movesMade.reduce((prev, curr) => (prev.score < curr.score ? curr : prev));
		} else bestMove = movesMade.reduce((prev, curr) => (prev.score > curr.score ? curr : prev));

		return bestMove;
	}

	private getNextSymbol(symbol: Exclude<TicTacToeSymbol, TicTacToeSymbol.EMPTY>) {
		return symbol === TicTacToeSymbol.X ? TicTacToeSymbol.O : TicTacToeSymbol.X;
	}
}
