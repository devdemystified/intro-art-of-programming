# Lesson Two
1. Feature test
1. Load a board
1. Validate load board
1. Throw error if not array
1. Error if array values not player numbers

## Feature test
In the first lesson, we learned how to test software to ensure it works. Then we learned the characteristics of a good test. Now we can start testing features.

Always start with the most important feature first. What's the most important feature of a tic tac toe game? Probably the board. Players will mark their spots there, and we'll need to use the board to determine who wins.

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

Using a single array will greatly simplify operations like checking for a winner and eventually connecting the array to the browser UI.

Pro tip: clarity is the most important quality of software. Using a single array may seem strange at first, but the benefits to the associated operations are worth it.

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

Curly brackets create a new object. By referencing a variable inside the brackets, a property with the same name and value will be added to the object.

Save the file and verify the test changes to `true`.

### Refactor
To "refactor" means to change _how_ the code works, without changing _what_ it does. In other words, once the test is written, you can and should re-write the code as many times as you see fit, until it's as good as it's gonna get.

Let's refactor the code. We'll use a different syntax for adding properties to objects.
```javascript
let ttt = {
  "board": [],
};
```
Instead of referencing a variable, we can specify object properties directly.

Gotcha: the quotes around the property name are optional, but keywords like `function` or `default` will cause errors if they're not quoted. Your linter or other build process tools  can add the quotes automatically.

Pro tip: commas are required to separate multiple property declarations. They're optional for the last declaration in the list. Some very old browsers may error on including them (IE8) but build tools can remove the commas before deploying.

I recommend you include the comma on every line, including the last. That way if you rearrange the properties you don't have to remember to add or remove commas. I also recommend you order your object properties alphabetically. These measures save a tiny little bit of time, which over the course of hundreds of object declarations and thousands of property edits really add up.

## Load a board
For our first tests, we decided having a board was the most important feature of our app to test. For our next test-feature, let's add the ability to load a pre-configured board.

At first glance, it may seem like taking a turn should be a higher priority. We might eventually use this board-loading feature directly in a case like restoring a game in progress, but we actually need it right now in order to test taking a turn.

Look ahead at the test cases taking a turn will require:
1. rejects invalid board position
1. rejects occupied board position
1. marks board position
1. checks if new board position caused a win or tie
1. if win or tie, update game status
1. if game in progress, switch current player

Tests 1, 2 and 4 will require setting up the test board in a specific configuration. In particular, checking win/tie logic is going to require numerous configurations (since wins can go horizontal, vertical, or diagonal).

Pro tip: the technical term for data configuration is "state". The quality of a program's state management is the primary difference between working smoothly and being chock full of bugs.

Right now we could assign the board object directly, like `ttt.board = [0, 1, 0];`. We don't want to do that for a few reasons. The main one is we'll eventually want to move `board` where outside code _can't_ modify it.

Imagine how much easier tracking down some bug would be if there was only one function allowed to update the board. You'd just put a `console.log` there and watch it as it updated. But if all the code is allowed to access the board, it can be near impossible to figure out where some unwanted update is coming from.

Controlling access to sensitive data is essential to having a program that behaves predictably. Moving data where outside code can't access makes it "private". To modify private data, a single public function called a "setter" validates requests first (a "getter" returns private data).

Terminology: this style of controlling access is called an "interface" - think of a protective barrier with those built-in gloves you see in nuclear reactors or infant incubators.

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

Gotcha: notice the `function` statement does not end in a semicolon. That's not an accident. JavaScript processes all the function declaration it finds before any statement is executed. This will be important later. The gotcha is, the `function` code can be placed anywhere within the file, and the object declaration will still work (because declarations are processed before executions). The slang for this is "hoisting", because it's 'as if' the code got 'hoisted' to the top of the file.

A function assigned to a property has a special relationship. Objects collect related data together, but functions _do stuff_, representing an object's behavior. An object's behaviors are called its "methods". The term method has a specific technical meaning, but it's frequently used interchangably with "function" when referring to object properties.

A method gets a special keyword, `this`. `this` refers to the object which the function is attached to, and provides a way to link data and behavior directly (if this function gets attached to different objects, `this` still works).

## Validate load board
We're loading a board, but we're not guaranteed our earlier tests will stay correct. For example, right now we could load a board that's not an array, and as long as it happened after the `board instanceof Array` test, there'd be no complaint.

Certain states should never occur, and defining those unacceptable conditions allows code to focus more precisely on valid situations. We're going to use JavaScript errors to correct this. We have bad associations with seeing computer errors, but the ones we see are "unhandled" errors. Using errors intentionally helps to produce solid code elsewhere.

Fun stuff: comic showing why any interface should [validate its inputs](https://xkcd.com/327/)

Terminology: errors get "thrown", and are then "handled" elsewhere. The keywords associated with this are `try` and `catch`. `try` wraps around the code you want to "try", and if an error is thrown, `catch` takes over.

## Throw error if not array
In `test.js`:
```javascript
const stringBoard = "1, 2, 3";
try {
  ttt.loadBoard(stringBoard);
  console.log("should have errored", false);
} catch(message) {
  console.log("board array error", message === "board must be an array");
}
```

and to change the test output, in `ttt.js`:
```javascript
function loadBoard(board) {
  if (!(board instanceof Array)) { throw "board must be an array"; }
  this.board = board;
}
```
New keyword, `if`, does what it looks like: evaluates a condition, and executes the code after based on the evaluation. The condition must be wrapped in the grouping operators, `(...)`. Follow the condition with a "block statement", also represented by curly brackets.

Inside the `if` condition, we're using `!`, the negation operator, to "flip" the result of the `instanceof` operator. The whole expression to be flipped needs to be wrapped in the grouping operators, `()`. Without the grouping operators, the negation would operate immediately on the term next to it - `!board` - and then compare that result to `instanceof Array`. There is a valid use for a negation directly next to a variable that we'll cover later, it's just not what we want here.

The `throw` keyword corresponds to `catch`: code execution stops, and program control switches to the `catch` block instead.

## Error if array values not player numbers
Anywhere you're expecting specific values, enforce them. We're going to record who plays where by inserting their player number (1 or 2) into the array. The board should not accept invalid values.

`test.js`
```javascript
const playerNumberBoard = [1, 2, 3];
try {
  ttt.loadBoard(playerNumberBoard);
  console.log("board rejects invalid value", false);
} catch(err) {
  if (err.message === "board values must be player numbers") {
    console.log("board rejects invalid value", true);
  } else {
    // errored for a different reason
    console.log("board rejects invalid value", false);
  }
}
```
Similar to the last test. This board has an intentionally invalid player number (`3`).

Two slashes indicates a comment, `//`. Any text after the slashes is not processed as JavaScript. Comments can be on their own line, or at the end of a statement, shown here.

Pro tip: keep the use of comments to a bare minimum. With meaningful variable and function names, code can be almost completely self-documenting. Use comments only when the code has to do something non-intuitive.

Adding comment slashes can be used to temporarily disable code while you're working on it. Do not leave commented-out lines hanging around in code. If you want to remove a feature, but you're worried you may need it again in the future - that is _exactly_ what version control is for. Leaving commented code in is bad for several reasons:
- your brain still parses it as code, but then has to extra-parse to remember it's nonfunctional.
- it is the definition of unnecessary; it adds to the size and complexity of your code without adding features.
- if a line accidentally gets un-commented, it's live code!

Note that the parameter `err` passed to `catch` is now an object, with a property `message`. Errors are usually objects, because in separate properties we could send both a human version (`err.message === "Helpful text for a person, could change"`) and a machine version (`err.code === "PERMANENT_ID_2205"`). We'll see the difference in the `throw` code next.

### Fail first, then make it pass
`ttt.js`
```javascript
   loadBoard: function loadBoard(board) {
     if (!(board instanceof Array)) throw "board must be an array";
     board.forEach(e => {
       if ([1, 2].indexOf(e) > -1) return;
       throw Error("board values must be player numbers");
     });
     this.board = board;
   }
```
When you implement this code, the "board loaded" test from lesson two will fail. That's exactly what we want! That tells us some previous assumption we made about the code is incompatible with this change.

Change the test data in the "board loaded" test: `const testBoard = [1, 2, 1];`

As an array, `board` has a built-in `forEach` function. Like the name says, `forEach` runs for each element in the array, and executes a function you provide.

Inside the parentheses of `forEach`, we're declaring a `function` using the "arrow" syntax (`=>`). Functions declared this way are all anonymous (name is optional when using the `function` keyword). Parameters on the left of the arrow, function body inside curly brackets on the right. If there are no function parameters, use a set of empty grouping operators - `()`.

There is a parameter here. `forEach` goes through its array, and calls the function you provide, passing each element as an argument. When the test runs, `e` will be 1, 2, and 3. There's no relationship between parameters and the values passed to them except position. If you named the parameters `(m, n, o)`, you'd still get 1, 2, and 3 as the values of the first parameter (`m`). The other parameters, `undefined`.

Next, we're comparing `e` to the values in array `[1, 2]`. The square brackets create the array, and also populate it with two elements. This is like an anonymous function. `indexOf` is a variation on `forEach` that searches for the value you pass, and returns the array index if found. A return value of -1 indicates the result was not found (remember, `0` is the first index).

Here we show the one-line `if` statement without the optional block operator brackets. I don't have a strong opinion about whether they should be used or not, but there's one rule you should always obey: whatever formatting you choose, be totally consistent within a project.

The only statement in the block is `return`. This keyword is only valid inside a function body. It tells the function to stop executing, on that line, and to pass control back to the _caller_. The caller here is `forEach`, which _calls_ the arrow function again with the next element until they've all been done.

Optionally, any expression on the right hand side will be evaluted and have its value passed back - the "return value" of the function.

If the code inside the function body finishes, and there's no `return` keyword at the end, the function returns `undefined` automatically.

Pro tips:
- If an arrow function body is only one line, that value gets returned automatically (`() => 2 + 2;` returns `4`). This is very useful when passing an arrow function to another function that loops - you pretty much always want the value to be passed back, and this saves a lot of typing (and forgetting to type!).
- The JavaScript interpreter will guess where statements should go, and perform Automatic Semicolon Insertion, or ASI. While this makes semicolons _technically_ optional, until you thoroughly understand ASI parsing behavior, set your linter to treat semicolons as if they were required.
- never start a line with an opening of a pair operator, `[`, `{`, or `(`. If the semicolon gets removed from the line above, the interpreter ASI may try to combine both lines together, resulting in a nasty bug:
```javascript
let theSemicolonIsMissing
( 2 + 2 )
```
This code will error that `theSemicolonIsMissing` is "not a function". Without the semicolon, the interpreter tries to parse both lines together, `theSemicolonIsMissing( 2 + 2 )`.
