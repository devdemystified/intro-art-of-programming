function loadBoard(board) {
  if (!(board instanceof Array)) throw "board must be an array";
  board.forEach(e => {
   if ([1, 2].indexOf(e) > -1) { return; }
   throw Error("board values must be player numbers");
  });
  this.board = board;
} 
 
let ttt = {
  board: [],
  loadBoard,
};
