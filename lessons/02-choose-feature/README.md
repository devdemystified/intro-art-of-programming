# Lesson Two 
1. Feature test
1. Load a board

## Feature test
In the first lesson, we learned the most important thing is to test software to ensure it works. Then we learned the characteristics of a good test. Now we start testing features. 

Like testing, we start with the most important feature first. What's the most important feature of a tic tac toe game? Probably the board. Players will mark their spots there, and we'll need to use the board to determine who wins. 

To represent the board, we'll use a JavaScript data structure called an array. An array is an ordered list. Any JavaScript data can be elements of an array - strings, objects, functions, or even other arrays. Each element can be referred to by the number of its position, called the array `index`. 

Visually, a tic tac toe board is laid out in a 3x3 grid. New programmers often want to replicate that structure in program data by nesting three arrays inside one. However, this arrangement increases complexity without providing corresponding benefits.

Instead, we'll use a single array of 9 elements, where each element corresponds to a square on the board - similar to the numbers on a phone keypad.
```
 0 | 1 | 2
 ---------
 3 | 4 | 5
 ---------
 6 | 7 | 8
```
Gotcha: because _computer science reasons_, array indexes start with 0.

This will greatly simplify operations like checking for a winner and eventually connecting the array to the browser UI.

Pro tip: simplicity is the most important quality of software. Using a single array may seem strange at first, but the simplicity is so powerful it's worth changing your thinking.

Add these lines to `test.js`.
```javascript
console.log(
  "ttt board is an array",
  ttt.board instanceof Array
);
```

We're going to add a property to the `ttt` object named `board`. You could write a test to check `board !== undefined`, but we'll leave that out of the lesson for brevity. 

If this `console` statement was all on one long line, it would be hard to read. Fortunately, in most places, JavaScript doesn't care about "whitespace" - tabs, spaces, returns and other non-visible characters. Here, we separate the function arguments onto multiple lines, but they're otherwise the same as the previous console log.

We have a new operator, `instanceof`. This works similar to the comparison operator: examines the arguments to its left and right, but returns `true` or `false` based on the category (aka `instance`) of data rather than the value.

## Make it pass
Change `ttt.js` like so:
```
let board = [];
let ttt = {
  board
};
```

We declare another variable and assign a value. The square brackets, `[]`, create a new array. Same as the object brackets, you can include any JavaScript data inside: `["text", 5, {}]`.

Curly brackets create a new object. If you reference a variable inside the brackets, it will add a property with the same name and value.

Save the file and verify the test changes to `true`.

### Refactor
To "refactor" means to change _how_ the code works, without changing _what_ it does. In other words, once the test is written, you should re-write the code as many times as you see fit, until it's as good as it's gonna get.

Let's refactor the code. We'll use a different syntax for adding properties to objects. 
```javascript
let ttt = {
  "board": [],
};
```
Instead of referencing a variable, we can specify object properties directly. 

Gotcha: the quotes around the property name are optional, but beware strange behavior without them. Keywords like `function` or `default` will cause errors if they're not quoted. Your linter can add the quotes automatically.

Pro tip: commas are required to separate multiple property declarations. They're optional for the last declaration in the list. Some very old browsers may error on including them (IE8) but again your linter can remove the commas before deploying. 

I recommend you always include the last comma. I also recommend you order your object properties alphabetically. These measures save a tiny little bit of time, which over the course of hundreds of object declarations and thousands of property edits really add up. 

## Load a board
For our first tests, we decided having a board was the most important feature of our app to test. For our next test-feature, let's add the ability to load a pre-configured board.

At first glance, it may seem like taking a turn should be a higher priority. We might eventually use this feature directly in a case like restoring a game directly in progress, but we actually need it right now in order to test taking a turn. 

Look ahead at the test cases taking a turn will require:
1. rejects being called if game is not in progress 
1. rejects invalid board position
1. rejects occupied board position
1. marks board position
1. checks if new board position caused a win or tie
1. if win or tie, update game status
1. if game in progress, switch current player

Tests 2, 3 and 5 will require setting up the test board in a specific configuration. In particular, checking win/tie logic is going to require numerous configurations (since wins can go horizontal, vertical, or diagonal).

Pro tip: the technical term for data configuration is "state". The quality of a program's state management is the primary difference between working smoothly and being chock full of bugs. 

Right now we could assign the board object directly, like `ttt.board = [0, 1, 0];`. We don't want to do that for a few reasons. The main one is we'll eventually want to move `board` where outside code _can't_ modify it. 

Imagine how much easier tracking down some bug would be if there was only one function allowed to update the board. You'd just put a `console.log` there and watch it as it updated. But if all the code is allowed to access the board, it can be near impossible to figure out where some unwanted update is coming from. 

Controlling access to sensitive data is essential to having a program that behaves predictably. Moving data where outside code can't access makes it "private". To modify private data, a single public function called a "setter" validates requests first (a "getter" returns private data). This style of controlling access is called an "interface" - think of a protective barrier with those built-in gloves you see in nuclear reactors or infant incubators. 

### Fail first
In the test, we're going to expect `ttt` has a function to do this. Add this to `test.js`, save and refresh.
```javascript
const testBoard = [1, 2, 3];
ttt.loadBoard(testBoard);
console.log("board loaded", ttt.board === testBoard);
```
Pro tip: give variables and functions simple, obvious names. You should know just from the name what it's responsible for. 

You'll get a `TypeError` on refresh because `loadBoard` doesn't exist yet. Referencing an object property that doen't exist results in `undefined`, but in this case, we're trying to call the property as a function (`loadBoard()` versus `loadBoard`). Calling a nonexistent function causes the error.

### Make it pass
`ttt.js`
```javascript
function loadBoard(board) {
  this.board = board;
}

let ttt = {
  board: [],
  loadBoard,
};
```
Similar to the last example, we're adding a property to the object. In this case, the value is a `function`. Functions do stuff in JavaScript, we can execute any statements we need to inside them. 

Gotcha: notice the `function` statement does not end in a semicolon. That's not an accident. JavaScript processes all the function declaration it finds before any statement is executed. This will be important later. The gotcha is, the `function` code can be placed at the end of the file, and the object declaration will still work (because declarations are processed before executions). The slang for this is "hoisting", because it's 'as if' the code got 'hoisted' to the top of the file. 

A function assigned to a property has a special relationship. Objects collect related data together, but functions _do stuff_, representing an object's behavior. An object's behaviors are called its "methods". The term method has a specific technical meaning, but it's frequently used interchangably with "function" when referring to object properties. 

A method gets a special keyword, `this`. `this` refers to the object which the function is attached to, and provides a way to link data and behavior directly (if this function gets attached to different objects, `this` still works).

