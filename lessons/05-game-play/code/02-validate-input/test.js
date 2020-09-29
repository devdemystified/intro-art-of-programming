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
  ()=>{
    const testBoard = [1, 2, 1];
    ttt.loadBoard(testBoard);
    console.log("board loaded", ttt.board === testBoard);
  },
  ()=>{
    const stringBoard = "1, 2, 3";
    try {
      ttt.loadBoard(stringBoard);
      console.log("should have errored", false);
    } catch(message) {
      console.log("board array error", message === "board must be an array");
    }
  },
  ()=>{
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
  }
].forEach(e => { e(); });
