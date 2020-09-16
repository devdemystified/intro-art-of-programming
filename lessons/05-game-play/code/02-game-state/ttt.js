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
  gameState: function gameState () {
    let gameState = 0;

    if (!this.board) throw Error("game state requires board array");
    if (!this.board.length) return 0;
    [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
    ].forEach(e => {
      if (
        this.board[e[0]] === this.board[e[1]] &&
        this.board[e[1]] === this.board[e[2]]
      ) { 
        gameState = this.board[0]; 
      }
    });
    return gameState;
  },
  loadBoard,
};
