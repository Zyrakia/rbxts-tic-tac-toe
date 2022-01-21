# Tic Tac Toe

This is a simple module to run games of tic-tac-toe. You can create your own players and outputs to match what your game needs and then let all the logic be handled by this module, simple as that.

For example, if you want this game to be played by two differently Roblox players, you could create a `NetworkPlayer`, which when asked for a move, waits for a `RemoteEvent` from a player specified in the constructor. Alongside that, to update participants of a game, you could create a `NetworkOutput` which sends the game information to each participating player whenever something about the game changes.

## Example

```ts
// The "ManualPlayer" is a built in player type which
// automatically returns a move when addressed.
const playerX = new TicTacToeManualPlayer('X');
const playerO = new TicTacToeManualPlayer('O');

// Create a game with two players
const ttt = new TicTacToeGame(playerX, playerO);

// Keep getting the next move until the game is over
while (!ttt.isOver()) {
	ttt.nextMove();
}

// Usually you would handle the result and playing
// of a game in an `Output` reactively, but here for
// clarity we do it declaratively.

const state = ttt.getState();

switch (state) {
	case TicTacToeState.X_WON:
		print('X WON!');
		break;

	case TicTacToeState.O_WON:
		print('O WON');
		break;

	case TicTacToeState.DRAW:
		print('DRAW');
		break;

	// Players can decide to return nothing
	// from their makeMove function to cancel the game.
	case TicTacToeState.CANCELLED:
		print('A player did not make a move');
		break;
}
```

## Benchmark

I am just including this section because I was curious myself, performance really isn't a concern though. Basically, I transformed the example above into a benchmark which runs 50,000 times, and accumulates each state instead of printing it. Each game took about 130μs.

Here is the output, this uses my benchmark utility from `@rbxts/zycore` by the way.

```
Benchmark(TicTacToe): 128.93 μs (6.45 s for 50000 runs)
X: 16084
O: 16295
Draw: 17621
Total: 50000
```
