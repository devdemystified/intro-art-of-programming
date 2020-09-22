# Lesson Four
1. Refactor to manage complexity
1. Separate test content from execution
1. Don't repeat yourself

## Refactor to manage complexity
We've got tests going good. However we're starting to see some problems:
- duplication: we're calling `console.log` over and over. 
- organization: this one file will get huge and unmanagable. 
- containment: all the tests share the same environment.

Software development consists of two activities: translating features into code, and managing complexity. The second half often gets ignored, but at the project's peril! Managing complexity is half the work.

When you manage complexity, the most common task you do is refactoring. To refactor is to change how the code works internally, without changing the inputs or outputs. Think of how a business might improve its internal process in such a way that customers don't have change how they order and receive.

We're going to refactor our tests into two files: the labels and conditions in one, the condition execution and output printing in another. 

We don't have to write tests for a refactor, because by definition, _what_ the code does hasn't changed, only _how_ it does it. We do still have to verify tests "switch" on and off though.

### Loop tests
This refactor will be a multi-step process. First, let's put all the tests in an array, and loop through them.

In `test.js`: 
- wrap an array around everything 
- wrap each test in an arrow function
- put a comma between each arrow function (because they're array elements)
- add a `forEach` method at the end of the array 
- execute each function inside the `forEach`

```javascript
[
  ()=>{
    console.log("ttt defined", ttt !== undefined);
  },
	()=>{
    console.log(
      "ttt board is an array",
      ttt.board instanceof Array
    );
  },
  ...
        // errored for a different reason
        console.log("board rejects invalid value", false);
      }
    }
  }
].forEach(e => { e(); });
```
Notice that `e` is each array element, which are functions. Therefore we can call `e` as a function just by adding grouping operators (`()`).

### Fail, then pass
This is a refactor, so if you changed the code successfully, you won't see any change in the output. Beware you don't trick yourself into a false sense of security! Change one of the test's data to confirm it still fails.

## Separate test content from running
Let's split up the tests from the code that runs the tests. The latter is a common tool, referred to by the highly technical name, "test runner". 

`index.html`
```html
  <head>
    <script src="ttt.js"></script>
    <script src="board-tests.js"></script>
    <script src="test-runner.js"></script>
  </head>
```

`board-tests.js`
```javascript
const boardTests = [
  ()=>{
    console.log("ttt defined", ttt !== undefined);
...
];
```

`test-runner.js`
```javascript
boardTests.forEach(e => { e(); });
```

Another refactor - again, make sure it works by changing something and observing the output.

### Multiple files
In the next lesson, we'll want to put all the "take turn" tests into their own file. Let's get ready by moving the smoke test ("ttt defined") out of the board tests. 

`index.html`
```html
    <script src="smoke-test.js"></script>
    <script src="board-tests.js"></script>
    <script src="test-runner.js"></script>
```

`smoke-tests.js`
```javascript
const smokeTests = [
  ()=>{
    console.log("ttt defined", ttt !== undefined);
  },
];
```

`board-tests.js`
```javascript
const boardTests = [
  ()=>{
    console.log(
      "ttt board is an array",
      ttt.board instanceof Array
...
];
```

## Single Responsibility Principle
The acronym DRY stands for "don't repeat yourself". DRY is well known in programming. It can be tricky to practice though - sometimes absolute adherence to the rule leads to complicated, buggy code, which consumes precious time without adding value.

More important than DRY to me is the Single Responsibility Principle. One piece of code should be responsible for one behavior, and nowhere else should replicate that behavior.

The responsibility for showing results is spread out all over our tests - everywhere we call `console.log`. Now that all tests flow through the test runner, we can move `console.log` there once. We'll use this to our advantage in the next task.

To show results requires a label and the test expression. Instead of performing logging within the function, we can `return` those values, and perform logging in the test runner.

`test-runner.js`
```javascript
  eachTestSuite.forEach(e => {
    const result = e();
    console.log(result.label, result.expression());
  });
```
Execute the function, but store the results in a variable. Then log the result.

`smoke-test.js`
```javascript
const smokeTests = [
  ()=>{
    return {
      label: "ttt defined",
      expression: ()=> ttt !== undefined,
    };
  },
];
```
In the tests, `console.log` turns into a `return` followed by an object.

See if you can convert `board-tests.js` without looking first. 

## Fails need to be obvious
As we add more tests, it's too easy for a failure to go unnoticed among all the success. In order to get the most benefit from automated testing, you want to know immediately when a test has failed. Noticing a failure after you've spent 20 minutes writing other code is totally counter-productive.

There's several ways we can alter our tests. The browser has an `alert` method, which causes a popup. This definitely gets your attention, but it's not "portable" - `alert` will error if we try to run our JavaScript outside the browser (like through Node.js).

The console follows the form of an old-school terminal environment called "REPL" - Read, Evaluate, Print, Loop. Google Chrome ties back to this lineage by supporting a programming concept called "escape sequences". Escape sequences are ordinary text which has a special meaning in one environment (they're not universal).

Pro tip: what if you want to use a quotation mark _inside_ a JavaScript string? Escape it, using a slash. `"Dogs say \"woof\"."

Let's add escape sequences to make the console output turn red on failure.

`test-runner.js`
```javascript
  eachTestSuite.forEach(e => {
    const result = e();
    const errorColor = "\x1b[31m%s\x1b[0m";
    const regularColor = "\x1b[2m%s\x1b[0m";
    if (!result.expression()) {
      console.log(
        errorColor,
        result.label + " false"
      );
      return;
    }
    console.log(
      regularColor,
      result.label, 
      true
    );
  });
```
`errorColor` and `regularColor` are the escape sequences. 

We call `result.expression()` once. Based on the result, we already know if the test has passed or failed. We can write `true` and `false` directly in ("hardcode") instead of calling again. 

Changing the color in the console only lasts for the next argument, so to make false red, we have to join them together.

Gotcha: JavaScript uses the `+` operator for both math and joining strings (technical name "concatenation"). When using mixed types, the operator may convert them: `5 + "5" === "55`. If you have any doubt that your variable may contain different types, convert them explicitly: `Number(5) + Number("5") === 10`.

In the false case, we exit out of the function with an empty `return`. Therefore we can skip the `else` - any code after the `return` is essentially in an else block already. This prevents adding code after the `else` without considering it will also affect the `if` block.

Change one of the test conditions to see the console output light up!
