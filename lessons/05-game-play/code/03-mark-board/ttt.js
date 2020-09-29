function loadBoard(board) {
  if (!(board instanceof Array)) throw "board must be an array";
  board.forEach(e => {
   if ([1, 2].indexOf(e) > -1) { return; }
   throw Error("board values must be player numbers");
  });
  this.board = board;
}
function gameState() {
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
}
function markBoard(player, position) {
  this.validateTurnInput(player, position);
  this.board[position] = player;
}
function validateTurnInput(player, position) {
  if (
    (!player && player !== 0) || 
    (!position && position !== 0) 
  ) {
    throw Error("requires both player and position");
  }
  if ([1, 2].indexOf(player) === -1) throw Error("invalid player number");
  if (ttt.board[position]) throw Error("board position occupied");
}

let ttt = {
  board: [],
  gameState,
  loadBoard,
  markBoard,
  validateTurnInput,
};
