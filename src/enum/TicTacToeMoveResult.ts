export enum TicTacToeMoveResult {
	/** The game ended before the move was made. */
	GAME_UNAVAILABLE,

	/** The current player did not respond with a move, this means the active game has been cancelled. */
	NO_RESPONSE,

	/** The move the current player provided was invalid. */
	INVALID,

	/** The move was recorded successfully. */
	SUCCESS,
}
