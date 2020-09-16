# Lesson Five
1. Check game state overview
1. Set up tests
1. Check game across
1. Use a loop to solve the general case

## Check game state overview
All the previous lessons kick into high gear here as we add game features. This lesson and the next are longer than the others, but should go faster - we've already established all our basics and now we're doing the cool, useful stuff.

We'll create a feature that will tell us the state of the game:
- not started
- in progress
- player 1 won
- player 2 won
- tie
There's one more possible state, when the game is still in progress but a tie is the only possible outcome. That one is much more complicated and not required for basic game play, so we will skip it. 

We want a method that will examine the board and tell us whether either player has won. This is where storing the board as a single array is going to pay off. 

To check, we pull out the array elements which correspond to a possible win: all three cells in the top row, middle, row, bottom row; same for the three columns, and finally the two diagonals. Then for each possible win, we simply loop through the cell elements and compare the values. If at any point, they are all the same (all one player), we can stop looking.

Novice developers often try to solve this problem without a loop.  Instead they build one enormous test statement, connecting all the possible cases with a bunch of "or" operators. This approach is almost too complicated for the tic tac toe game, but it can be made to work with a whole lot of careful typing and trial-and-error debugging.

As an algorithm gets more complicated, the one-shot solution gets twice as hard to manage. Loops have tremendous power in programming because whatever the final intended action, you only have to enter it once. Imagine if you wanted to change how the board stored marked positions - using the loop method, only one line would need changing.

## Set up tests
We're going to repeat our testing process for the new features. First, a smoke test for the method.
`smoke-tests.js`
```javascript
...
  },
  ()=>{
    return {
      label: "can check state",
      expression: ()=> ttt.gameState() !== undefined,
    };
  },
];
```
Here we just make sure the method returns _something_.

`index.html`
```html
    <script src="smoke-tests.js"></script>
```
Note the file name changed to `tests`, plural. File names need to accurately reflect their content, just like variable names. This may seem trivial, but it's the kind of thing you'll forget which will drive you bonkers later. 

Pro tip: Remember, you're writing code for another person to read. That person is trying to figure out how you arranged the code, and only has the clues you leave to go by. That person may be _future_-you! I have a great memory but still forget how my old code was supposed to work. 

The variable names in the test file and the test runner have to match.
`test-runner.js`
```javascript
[
  smokeTests,
  boardTests,
].forEach(eachTestSuite => { 
```

### Make it pass
The test will error until we put _something_ into the code. It's okay to write incremental, placeholder code. Once the test passes, we can refactor into something better.

`ttt.js`
```javascript
let ttt = {
  board: [],
  gameState: ()=> "something",
  loadBoard,
};
```
Confirm the tests pass. 

### Another test suite
We'll add a new file for all the game state tests. For the first test, we'll check the empty board.

`state-tests.js`
```javascript
const stateTests = [
  ()=>{
    return {
      label: "empty board returns 0",
      expression: ()=> {
        ttt.loadBoard([]),
        return ttt.gameState() === 0;
      }
    };
  },
];
```
Make it pass: 
`ttt.js`
```javascript
  gameState: ()=> 0,
```
Pro tip: We know, separate from this code, that `ttt.board` starts out with an empty array. But it's worth it to call `loadBoard` with an empty array anyway:
- this test doesn't know what `ttt` starts out with.
- what `ttt` starts out with could change.
- it documents an assumption, which is that `gameState` expects a board.

Since we're expecting a value, we should enforce it with a thrown error. We don't need to test the error every time - if you configure an error condition and then trigger it, all you've really demonstrated is that JavaScript error handling works. 
`ttt.js`
```javascript
  gameState: ()=> {
    if (!this.board) throw Error("game state requires board array");
    return 0;
  },
```

Add the file to the page. 
`index.html`
```html
    <script src="state-tests.js"></script>
```

Add it in the test runner too. 
`test-runner.js`
```javascript
[
  smokeTests,
  boardTests,
  stateTests,
].forEach(eachTestSuite => { 
```
Pro tip: On a real project, a 3rd party tool would handle this syncing automatically. When you have dozens or hundreds of test files, automation is not optional. However automation introduces problems of its own, one of which is reducing clarity. We're handling the sync manually to expose the basic mechanisms at work. 

At this point you should have a failing test for "empty board returns 0". We can make it pass with placeholder code:

`ttt.js`
```javascript
  gameState: ()=> 0,
```

It's a good idea to enforce validation here too. We already have a test that guarantees the board will be an array, but we aren't guaranteed that a board will have been loaded at the time `gameState` gets called.

Not having a board should be outside of the acceptable operation of `gameState`, so we'll throw an error. 

`ttt.js`
```javascript
  board: [],
  gameState: function gameState () {
    if (!this.board) throw Error("game state requires board array");
    return 0;
  },
```
We're declaring an object property named `gameState`. Then we're declaring a named function and assigning it as the value. The name comes after the `function` keyword and has the same basic naming rules as variables.

Gotcha: an arrow function will not work here(try it!). Arrow functions treat `this` slightly differently. Instead of the object they're attached to, `this` will point at the object representing the function in which they were created. Since we didn't put a function around the `gameState` code, it points at the global function, `Window`. Note that functions are objects - if you manually added `Window.board` the code would work again. 

Pro tip: two other reasons to use named functions as object methods:
- JavaScript compilers can use the function's to optimize for performance
- having the name displayed in various debugging tools really helps

## Check across
Remember the keypad concept? That's how we'll check if there's a winner.
```
 0 | 1 | 2
 ---------
 3 | 4 | 5
 ---------
 6 | 7 | 8
```
Array index numbers 0, 1, 2 represent the top row. We want to test that the method recognizes winning and non-winning states:
- win: `[1, 1, 1]` or `[2, 2, 2]`
- non-win: `[1, 2, 1]`, `[1, 2]` etc
`state-tests.js`
```javascript
  ()=>{
    return {
      label: "player one wins returns 1",
      expression: ()=> {
        ttt.loadBoard([1, 1, 1]);
        return ttt.gameState() === 1;
      }
    };
  },
  ()=>{
    return {
      label: "player two wins returns 2",
      expression: ()=> {
        ttt.loadBoard([2, 2, 2]);
        return ttt.gameState() === 2;
      }
    };
  },
```
And placeholder code to make it pass:
`ttt.js`
```javascript
  gameState: function gameState () {
    if (!this.board) throw Error("game state requires board array");
    if (!this.board.length) return 0;
    return this.board[0];
  },
```
Note we're referencing a specific array value in the return statement, by putting the array index inside square brackets at the end of the variable name.

`this.board` is an array, and arrays have properties, because they're a subtype of objects. In fact, almost everything in JavaScript can be treated as objects.

Gotcha: object properties are not guaranteed to be consistent between types. An array's `length` property tells you how many elements it contains, a string's `length` property tells you how many characters it has (`"hey".length === 3`), but a function's `length` property tells how many arguments it takes. 

Pro tip: the one method all objects share is `toString`. This method defines how the object represents itself as text, like when it's passed to `console.log`.

### Make it meaningful
Right now our placeholder code passes. Let's put it in a test that will force us to write meaningful code. If we try to detect a mixed state - a game in progress but not yet won - it will "paint us in a corner" where we'll have to write functional code. 

`state-tests.js`
```javascript
  ()=>{
    return {
      label: "no winner returns 0",
      expression: ()=> {
        ttt.loadBoard([1, 2, 2, , , 1]);
        return ttt.gameState() === 0;
      }
    };
  },
```
Note the commas represent empty elements in the array passed to `loadBoard`. The last `1` would be in the right column of the middle row. `array.length` doesn't count empty elements, and returns 4.

Placeholder code can't pass all these tests at once. But, we still don't yet have to build the _full_-full solution. For now, let's just pass the case when the win goes across the top row.

`ttt.js`
```javascript
    if (
      this.board[0] === this.board[1] &&
      this.board[1] === this.board[2]
    ) { 
      return this.board[0]; 
    }
    return 0;
```
It's not a win unless all three cells match. If they all match, any of them can be returned as the player number. If no match, return `0`.

The "and" operator, `&&`, joins together the result of two boolean expressions. It returns `true` if both of its arguments are `true`. Related operator "or", `||` is two "pipe" characters (shift + backslash on the keyboard).

## Loop to solve the general case
The "general" case means considering all the various combinations: three rows, three columns, two diagonals. We're going to keep the code short by using a loop.

Let's start by refactoring what we have already:
`ttt.js`
```javascript
  gameState: function gameState () {
    let gameState = 0;

    if (!this.board) throw Error("game state requires board array");
    if (!this.board.length) return 0;

    const topRow = [0, 1, 2];
    if (
      this.board[topRow[0]] === this.board[topRow[1]] &&
      this.board[topRow[1]] === this.board[topRow[2]]
    ) { 
      gameState = this.board[0]; 
    }
    
    return gameState;
  },
```
In this refactor, we've replaced the hardcoded board indexes with a variable. Right now there's only one value for the variable. Next we'll add multiple values, representing multiple directions.

To support multiple values, we'll use another array to store them. We can set up the loop with just one value in the matrix:
`ttt.js`
```javascript
    const winMatrix = [
      [0, 1, 2],
    ];
    winMatrix.forEach(e => {
      if (
        this.board[winMatrix[0]] === this.board[winMatrix[1]] &&
        this.board[winMatrix[1]] === this.board[winMatrix[2]]
      ) { 
        gameState = this.board[0]; 
      }
    });
```
Let's write a test to force us to handle a win other than the top row. 
`state-tests.js`
```javascript
  ()=>{
    return {
      label: "win by column one",
      expression: ()=> {
        ttt.loadBoard([1, 2, , 1, 2, , 1]);
        return ttt.gameState() === 1;
      }
    };
  },
```

Making it pass is super simple:

`ttt.js`
```javascript
    const winMatrix = [
      [0, 1, 2],
      [0, 3, 6],
    ];
```

Diagonal:

`state-tests.js`
```javascript
  ()=>{
    return {
      label: "win by diagonal",
      expression: ()=> {
        ttt.loadBoard([1, 2, , , 1, 2, , 2, 1]);
        return ttt.gameState() === 1;
      }
    };
  },
```

And pass.

`ttt.js`
```javascript
    const winMatrix = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
    ];
```
Terminology: what we've done here is called "abstraction". To abstract is to separate what is different from what is the same. Different directions in which to search; same condition to determine if the direction-values are a win.

Pro tip: abstraction can be very powerful, but there's a cost to clarity. Literal code is much easier to understand, and code must be understood before maintenance and extension. Choosing the balance between power and clarity is part of the art of programming. 

Exercise for you: add test cases for the other rows, columns and diagonals. Fail first, then add array elements to make it pass.


