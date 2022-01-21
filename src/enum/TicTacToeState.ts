export enum TicTacToeState {
	/** The X player won. */
	X_WON,

	/** The O player won. */
	O_WON,

	/** The game ended in a draw. */
	DRAW,

	/** The game is still in progress. */
	IN_PROGRESS,

	/** The game was cancelled. */
	CANCELLED,
}
