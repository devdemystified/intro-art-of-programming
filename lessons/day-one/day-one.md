# Day one
1. Setup our environment
1. A word about safety
1. Perform a "smoke test"
1. About good tests
1. Test our first feature

## Setup our environment
For this course, we'll be using JavaScript inside the browser. The instructions are written specifically for Google Chrome. If you don't want to use Chrome, the code will work in any modern browser, but the menus and commands for the development tools will be slightly different. 

We'll need a working area to store files as we go. Create a new folder (directory) somewhere in your documents. It doesn't matter where, or what it's named - just don't forget it!

Copy the code below into a file named `index.html` in your working area. We use an HTML file simply to organize and load JavaScript files in the browser. The name doesn't matter, but `index.html` is the convention.

```
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

Create another file, `ttt.js`, in the same directory (we'll use 'ttt' throughout as an abbreviation for "tic-tac-toe"). 

Save the file with this content:
```
let ttt;
```
`let` is one of several javascript keywords that declares a new variable. All variables are placeholders in run-time memory where we can store data.

The only rule about variable names is the first character must be a letter or an underscore (`_`). The most important practices about variable names is they should be easy to understand, and all names throughout a project should follow a consistent pattern. 

We name this variable `ttt` (short for "tic tac toe"). It's okay to use an abbreviation because we'll use "ttt" as a prefix frequently throughout the project.

Open `index.html` in Chrome (`command + O`, menu File > Open File, or similar). You should see "intro to programming" in the main window. That tells us the HTML worked, but we don't yet know about the JS.

## A word about safety

## Perform a "smoke test"
In electronics, when you finish wiring your circuit, you connect it to the power. If it starts smoking, you know something went wrong! A "smoke test" is a simple, early indicator. 

Let's check if the script tag is working. 

Open Dev Tools, where we'll doing most of our JavaScript work. Right click anywhere in the main window, and choose "Inspect". The Dev Tools window will appear next to the main window. 

In `index.html`, change the file name in the script tag's `src` attribute, or rename the file to something other than `ttt.js`. What we're trying to do is break the connection between the `src` attribute and the JS file, so the browser can't find it.

Refresh the page. The Dev Tools window should now show an error: "ERR_FILE_NOT_FOUND". This is good! It shows that the script tag tried to find the file.

Change the file name back, and refresh the page. The error goes away. 

Pro tip: Anytime you're not sure why something isn't working, use this same technique: edit the code to intentionally break something. One really common mistake happens when you're editing a different file than you think you are. For example, maybe you started this lesson with `index.html`, but decided to change the name to `my-file.html`. If you still have `index.html` open in the browser, you won't see any changes to `my-file.html` show up there!

## About good tests
What's the most important quality in any software? It needs to _work_. There's a saying in hot rod culture, "all show and no go". If your car looks really cool, it might be sculptural art, but if doesn't drive fast, it's not a hot rod.

To ensure our software works, we test. At first it's okay to perform manual testing, like our smoke test exercise. But as you add more and more features, manual testing takes longer and longer. Eventually we have no choice but to automate our tests, or we'd spend all day performing manual testing. Automated tests are nothing more than manual tests, performed by code. 

Our smoke test has demonstrated several qualities of good tests:
- deterministic: the same input always produces the same output.
- singular/focused: only test one condition at a time.
- isolated: other test conditions don't affect this one. 
- reproduceable: the environment can be manipulated so a test passes or fails on demand.

In `index.html`, add another script tag after the first one:
```
  <head>
    <script src="ttt.js"></script>
    <script src="test.js"></script>
  </head>
```
Save the file. 

Create file `test.js` in the same folder with this content:
```
console.log("ttt", ttt);
```

`console` is an object the browser provides that organizes communication. `log` is a function that prints data where the user can see it. More on objects and functions to come. 

By passing in the `ttt` variable as the second parameter, log() will print out a text version of the variable's data. We also pass in "ttt" as text as the first parameter. This labels the output, but more importantly, something will still be printed in case the variable has no data.
