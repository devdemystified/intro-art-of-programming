# Lesson Five: Take Turns
1. Set up tests
1. Validate player and position input
1. Mark board
1. Notify on win

## Take Turns
Now that we have the game state feature, we'll create the turn-taking feature. This will give us a basic working game!

A tic-tac-toe turn cycle can be described like this:
- set the current player
- wait for the player to input a position
- check that position is valid
- mark the board at the position specified by the player
- check the game state
- announce a win or switch to the next player

We're going to leave out the concept of the "current" player. Partly because we can, and therefore by definition it's not essential. Also, the concept of "current" is going to add complexity. So first we'll get the code working while we tell it explicitly which player is taking the turn.

Waiting for input is a legitimate task to handle. In other languages, and even in some advanced front-end web development, this task needs to be addressed explicitly. In this case, we don't need to do any work here.

## Set up tests
As usual, start with a new file for the test suite, and a smoke test. The setup code is largely the same as the last test suite, so instead, here's a list of the steps:
- create `turn-tests.js` with a new variable name, `turnTests`
- add a `script` tag to `index.html` to load `turn-tests.js`
- add the `turnTests` variable to `test-runner.js`
- add an arrow function to `smoke-tests.js`
Here's the non-repetitive part, the test conditions:
`smoke-tests.js`
```javascript
      label: "can validate turn input",
      expression: ()=> ttt.validateTurnInput !== undefined,
```
Note `validateTurnInput` has no calling parentheses. Even simpler than the other smoke tests, just checking if it's even defined.

Put a "bomb" into `turn-tests.js` so when it blows up we know the file is loading:
```javascript
const turnTests = [
  ()=>{
    return {
      label: "errors on purpose",
      expression: ()=> {
        return false;
      },
    };
  },
```
And make the smoke test pass...
`ttt.js`
```javascript
function validateTurnInput() {}

let ttt = {
  board: [],
  gameState,
  loadBoard,
  validateTurnInput,
};
```
Refactor: for clarity and consistency, all of the functions are defined outside the `ttt` object and then referenced by name (moved `gameState`).

Pro tip: unless order matters, organize everything alphabetically: object properties, function names, variables, everything. Some people try to organize data by what they "do". This requires you to spend time thinking about categories, and potentially searching for something mis-categorized. Alphabetizing takes you straight there.

## Validate player and position input
Now let's validate input. First, expect there to be values for player and position.
`turn-tests.js`
```javascript
      label: "turn requires both player and position",
      expression: ()=> {
        try {
          ttt.validateTurnInput(1);
          return false;
        } catch (err) {
          return err.message === "requires both player and position";
        }
      },
```
`ttt.js`
```javascript
function validateTurnInput(player, position) {
  if (
    (!player && player !== 0) || 
    (!position && position !== 0) 
  ) {
    throw Error("requires both player and position");
  }
}
```
Compound-condition `if`. Here we use a JavaScript idiom called - no joke - "truthy". In the same way every JavaScript data has a string representation, it also has a `boolean` representation. Certain values, when evaluated in an expression, return `false`:
- `false`, obviously
- `undefined`. this is the "falseness" we're checking for with `!player...`
- `null`. Legacy value. Some developers use it, most pretend it doesn't exist.
- `NaN`. "Not a number". Returned for some math errors, like `"words" / 3`.
- `""`. Empty string. Has properties - `"".length === 0` - but evaluates `false`.
- `0`.
Everything else evaluates as `true` - strings, numbers, objects, functions. Truthyness makes checking for empty variables as easy as `(!variable)`.

The catch are zeroes. Sometimes a zero indicates "not found" or "no result", but sometimes it indicates a valid value (array index, or account balance). We exclude them here so they're not treated as missing arguments. `0` is an invalid value for player number, but the next test will handle that case.

Player number...
`turn-tests.js`
```javascript
  ()=>{
    return {
      label: "turn requires valid player number",
      expression: ()=> {
        try {
          ttt.validateTurnInput(0, 0);
          return false;
        } catch (err) {
          return err.message === "invalid player number";
        }
      },
    };
  },
```
`ttt.js`
```javascript
  if ([1, 2].indexOf(player) === -1) throw Error("invalid player number");
```
Exercise: we're using `[1, 2]` in two places now. Refactor to make both refer to the same data. Hint: use the same approach as `board`.

Now for board positions.
`turn-tests.js`
```javascript
  ()=>{
    return {
      label: "turn can't take occupied board position",
      expression: ()=> {
        ttt.loadBoard([1]);
        try {
          ttt.validateTurnInput(1, 0);
          return false;
        } catch (err) {
          return err.message === "board position occupied";
        }
      },
    };
  },
```
`ttt.js`
```javascript
  if (ttt.board[position]) throw Error("board position occupied");
```

Exercise: write a test to check for "out of bounds" - invalid board positions. Hint: nine cells on the board means valid board positions have array indexes 0-8.

## Mark the board
Right now we can mark the board directly, like `ttt.board[0] = 1;`. Eventually we'll want to control access - we'll move the board to a "private" location where other code can't access it (JavaScript doesn't have an explicit "private" statement, but function scope can be used for the same result). If all the code can access the data, finding bugs can be borderline impossible.

Instead, we'll require all code to go through a "setter" method. A setter is just a method that sets another value. The benefit is having a single responsibility for the behavior of _setting_. Imagine how we could `console.log` inside the setter, and see every action altering the data as it came through.

`turn-tests.js`
```javascript
  ()=>{
    return {
      label: "mark the board position",
      expression: ()=> {
        ttt.loadBoard([]);
        ttt.markBoard(1, 0);
        return ttt.board[0] === 1;
      },
    };
  },
```
`ttt.js`
```javascript
function markBoard(player, position) {
  this.validateTurnInput(player, position);
  this.board[position] = player;
}
```
Also add `markBoard` to the `ttt` object.

With `validateTurnInput` called from within `markBoard`, we're preventing invalid values in the array.

## Notify on win
If `gameState` indicates a win, we want to be notified. `console.log` works fine in the tests, but this notification is a different use case. What if a player doesn't have their console open?

We'll create a single responsibility method for notification. Then if we change how notifications happen in the future, the other game-related code won't have to change.

No tests for this method. It's completely "side effects" - no game logic. Also notifications may eventually be platform-dependent, which means the tests would also be.

We've been writing what are called "unit tests". This bottom-up approach focuses on the smallest pieces of code that can be tested. There's a complementary top-down approach, integration or end-to-end (e2e) tests. Verifying notifications would be a great candidate for these tests.

`ttt.js`
```javascript
function notify(message) {
  if (window && window.alert) {
    window.alert(message);
    return;
  }
  console.log(message);
}
```

Speaking of side effects, let's also create a method that just translates the game state number to text.
`ttt.js`
```javascript
function gameStateText(gameState) {
  switch (gameState) {
    case 1: 
      return "Player one won";
      break;
    case 2: 
      return "Player two won";
      break;
  }
}
```
## Tie it all together
We have all the parts we need to play tic tac toe now, but it would be nice if they were hooked up together. Let's make a wrapper of the kind called a "convenience method".

No unit tests for convenience methods, because all the pieces have their own tests.
`ttt.js`
```javascript
function takeTurn(player, position) {
  this.markBoard(player, position);
  const gameState = this.gameState();
  if (gameState > 0) this.notify(
    gameStateText(gameState)
  );
}
```
Add `takeTurn` to the `ttt` object, and play a game! I'll go first: `ttt.takeTurn(1, 4)`.
