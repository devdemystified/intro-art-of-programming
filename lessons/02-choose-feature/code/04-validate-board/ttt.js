function loadBoard(board) {
  if (!(board instanceof Array)) throw "board must be an array";
  this.board = board;
} 
 
let ttt = {
  board: [],
  loadBoard,
};
