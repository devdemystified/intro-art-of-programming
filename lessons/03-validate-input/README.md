# Lesson Three
1. Validate load board
1. Throw error if not array
1. Error if array values not player numbers 

## Validate load board
We're loading a board, but we're not guaranteed our earlier tests will stay correct. For example, right now we could load a board that's not an array, and as long as it happened after the `board instanceof Array` test, there'd be no complaint.

Certain states should never occur, and defining those unacceptable conditions allows code to focus more precisely on valid situations. We're going to use JavaScript errors to correct this. We have bad associations with seeing computer errors, but the ones we see are "unhandled" errors. Using errors intentionally helps to produce solid code elsewhere. 

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
  if (!(board instanceof Array)) throw "board must be an array";
  this.board = board;
}
```
New keyword, `if`, does what it looks like: evaluates a condition, and executes the code after based on the evaluation. The condition must be wrapped in the grouping operators, `(...)`. Use curly brackets for the evaluation "code block", if it doesn't fit on one line: `if (condition) { ... }`. Optional otherwise, but like trailing commas, often used when optional for consistency. 

Inside the `if` condition, we're using `!`, the negation operator, to "flip" the result of the `instanceof` operator. The whole expression to be flipped needs to be wrapped in the grouping operators, `()`. Without the grouping operators, the negation would operate immediately on the term next to it - `!board` - and then compare that result to `instanceof Atrray`. There's a valid use for a negation next to a variable that we'll cover later.

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
- if a line accidentally gets un-commented, it's live! potential disaster.

Note that the parameter `err` passed to `catch` is now an object, with a property `message`. Errors are usually objects, because in separate properties we could send both a human version (`err.message === "Helpful text for a person, could change"`) and a machine version (`err.code === "PERMANENT_ID_2205"`). We'll see the difference in the `throw` code next.

### Fail first, then make it pass
`ttt.js`
```javascript
   loadBoard: function loadBoard(board) {
     if (!(board instanceof Array)) throw "board must be an array";
     board.forEach(e => {
       if ([1, 2].indexOf(e) > -1) { return; }
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

Next, we're comparing `e` to the values in array `[1, 2]`. The square brackets create the array, and also populate it with two elements. This is like an anonymous function. `indexOf` is a variation on `forEach` that searches for the value you pass, and returns the array index if found.

Array indexes in JavaScript, like most C-family languages, start at 0. A return value of -1 indicates the result was not found. 

Here we show the one-line `if` statement with the optional block operator brackets. I don't have a strong opinion about whether they should be used or not, but there's one rule you should always obey: whatever formatting you choose, be totally consistent within a project.

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
