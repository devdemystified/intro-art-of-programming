console.log("ttt defined", ttt !== undefined);
console.log(
  "ttt board is an array",
  ttt.board instanceof Array
);
const testBoard = [1, 2, 3];
ttt.loadBoard(testBoard);
console.log("board loaded", ttt.board === testBoard);
