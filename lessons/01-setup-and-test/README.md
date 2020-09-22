# Lesson one
1. Setup our environment
1. Data safety
1. Perform a "smoke test"
1. About good tests
1. Our first test
1. Fail first, then pass

## Setup our environment
For this course, we'll be using JavaScript inside the browser. The instructions are written specifically for Google Chrome. If you don't want to use Chrome, the code will work in any modern browser, but the menus and commands for the development tools will be slightly different.

We'll need a working area to store files as we go. Create a new folder (directory) somewhere in your documents. It doesn't matter where, or what it's named - just don't forget it!

Copy the code below into a file named `index.html` in your working area. We use an HTML file simply to organize and load JavaScript files in the browser. The name doesn't matter, but `index.html` is the convention.

```html
<!doctype html>
<html lang="en">
  <head>
    <script src="ttt.js"></script>
  </head>
  <body>
    <h1>intro to programming</h1>
  </body>
</html>
```
Pro tip: anything you copy-paste you'll never learn. We'll copy-paste this code, because we're skipping HTML for now. For the rest of the lessons, don't copy-paste anything. There is huge value in reading code and then typing it out yourself.

Examples of all code in this course are available in the Github [repo](https://github.com/devdemystified/intro-to-programming/) under lessons > each day > code.

Create another file, `ttt.js`, in the same directory (we'll use 'ttt' throughout as an abbreviation for "tic-tac-toe").

Save the file with this content:
```javascript
let ttt;
```
`let` is one of several javascript keywords that declares a new variable. All variables are placeholders in run-time memory where we can store data.

The only rule about variable names is the first character must be a letter or an underscore (`_`). In practice, variable names need to be easy to understand, and all names throughout a project should follow a consistent pattern.

We name this variable `ttt` (short for "tic tac toe"). It's okay to use an abbreviation because we'll use "ttt" as a prefix frequently throughout the project.

Open `index.html` in Chrome (`command + O`, menu File > Open File, or similar). You should see "intro to programming" in the main window. That tells us the HTML worked, but we don't yet know about the JS.

## A word about data safety
Programmers have an unspoken responsibility to users to protect their data at all costs. As a programmer, you are also a user - the code is your data.

Professional programmers use software called "version control" to manage their data safety. A single character can have a huge difference on how a program operates - imagine the difference between "greater than" and "greater than or equal to". Version control software enables you to track, organize and manage changes down to the single character level.

Professional version control is beyond the scope of this intro course. But as you progress, it's recommended to back up your files by saving a copy outside of your work area on a regular basis. That way if something goes wrong with your working copy, you can revert to one of the saved versions without losing your progress.

## Perform a "smoke test"
In electronics, when you finish wiring your circuit, you connect it to the power. If it starts smoking, you know something went wrong! A "smoke test" is a simple, early indicator.

Let's check if the script tag is working.

Open Dev Tools, where we'll doing most of our JavaScript work. Right click anywhere in the main window, and choose "Inspect". The Dev Tools window will appear next to the main window.

In `index.html`, change the file name in the script tag's `src` attribute, or rename the file to something other than `ttt.js`. What we're trying to do is break the connection between the `src` attribute and the JS file, so the browser can't find it.

Refresh the page. The Dev Tools window should now show an error: "ERR_FILE_NOT_FOUND". This is good! It shows that the script tag tried to find the file.

Change the file name back, and refresh the page. The error goes away.

Pro tip: Anytime you're not sure why something isn't working, use this same technique: edit the code to intentionally break something. One really common mistake happens when you're editing a different file than you think you are. For example, maybe you started this lesson with `index.html`, but decided to change the name to `my-file.html`. If you still have `index.html` open in the browser, you won't see any changes to `my-file.html` show up there!

## About good tests
What's the most important quality in any software? It needs to _work_. There's a saying in hot rod culture, "all show and no go". If your car looks really cool, it might be sculptural art, but if doesn't drive, it's kind of not a car.

To ensure our software works, we test. At first it's okay to perform manual testing, like our smoke test exercise. But as you add more and more features, manual testing takes longer and longer. Eventually we have no choice but to automate our tests, or we'd spend all day performing manual testing. Automated tests are simply manual tests, performed by code.

Our smoke test has demonstrated several qualities of good tests:
- deterministic: the same input always produces the same output.
- isolated: only test one condition at a time.
- independent: other test conditions don't affect this one.
- reproduceable: the environment can be manipulated so a test passes or fails on demand.

Notice that "complicated" is not a quality of a good tests. Numerous small, simple tests are much better than one big messy one.

## Our first test
In `index.html`, add another script tag after the first one:
```html
  <head>
    <script src="ttt.js"></script>
    <script src="test.js"></script>
  </head>
```

Create file `test.js` in the same folder with this content:
```javascript
console.log("ttt defined", ttt !== undefined);
```

`console` is an object the browser provides that organizes communication. Objects are collections of properties, which can be referred to following a `.`. `log` is a function that prints data where the user can see it. Much more on objects and functions to come.

We pass in the text string "ttt defined" (in quotes) as the first parameter. This labels the output, but more importantly, something will still be printed in case the second parameter is empty. An empty log message is worse than useless because it adds noise to the test results, but can be super difficult to track down and remove.

In the second parameter we compare the current value of the _variable_ `ttt` (no quotes) using the negative comparison operator, `!==`. JavaScript operators take their left and right hand values and perform some operation using them. In this case, the operator will return `true` or `false` depending on whether the values do _not_ match (the exclamation point means "negation", or opposite, in many places in JavaScript).

`undefined` is a native JavaScript value representing the lack of a value. Since we didn't assign a value when we declared `let ttt`, `ttt` will match `undefined`. The  operator will therefore return `false` (because it was negated).

Simple tests like this add value by reducing the time you spend investigating. If all our other feature tests fail but this one does not, we know there's a different category of problem without having to go look manually.

A 'gotcha' to watch out for: Javascript has two positive comparison operators, `==` and `===`. `==`  should never be used. Trying to be "helpful", `==` performs some complicated and non-obvious conversions before comparing the two values. For example, `==` will convert text strings and numbers to the same type, so that `"5" == 5` (the text string "5" and the numerical object 5). This behavior can cause subtle and hard to find problems. `==` is generally acknowledged to have been a design mistake, but can't be removed from the language. A program called a "linter" can be used to automatically catch `==` and convert it to `===`.

Pro tip: any of these expressions can be executed in the same Dev Tools window where `console.log` prints out. Try it! You might put your program into a weird state by messing around, but you can always refresh the browser to clear the memory.

## Fail first, then pass
In `ttt.js`, let's assign a value to `ttt`:
```javascript
let ttt = {};
```
`let ttt` declares the variable, reserving space for it in memory. Variables can (and usually should) be assigned a value at the time they're created.

The single equals is the assignment operator. It takes the value on the right hand side and copies it into the memory named by the variable on the left.

On the right, the curly brackets are the symbol to create a new, empty object. `ttt` will now have that value instead of `undefined`.

Gotcha: it's super easy to type `=`, and perform assignment, when you really meant to type `===` and perform comparison. This is not only JavaScript, numerous languages use `=` for assignment and `==` for comparison. A linter may not catch this since it can't guess your intention.

Pro tip: If your program is displaying bizarre behavior, use console log to print out the values of the variables. You'll notice one of your variables has the value you intended to compare.

Two reasons why you always want to fail first.

Some tests are accidentally "evergreen": they never fail (aka, turn red) under any conditions. These are worse than useless because they give a false sense of security. Failing first guarantees the test does what you want.

Writing the test can also be thought of as defining "what" the program does. Writing the code then defines "how" the program does it. The better you get at separating "what" and "how", the better programs you'll write.

Refresh the browser, and you'll see the console message change to `true`. The test passed, finishing our first feature!
