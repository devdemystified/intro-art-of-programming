const boardTests = [
  ()=>{
    return {
      label: "ttt board is an array",
      expression: ()=> ttt.board instanceof Array,
    };
  },
  ()=>{
    const testBoard = [1, 2, 1];
    ttt.loadBoard(testBoard);
    return {
			label: "board loaded",
			expression: ()=> ttt.board === testBoard,
    };
  },
  ()=>{
    const stringBoard = "1, 2, 3";
    try {
      ttt.loadBoard(stringBoard);
      return {
        label: "should have errored",
        expression: ()=> false,
      };
    } catch(message) {
      return {
        label: "board array error",
        expression: ()=> message === "board must be an array",
      };
    }
  },
  ()=>{
    const playerNumberBoard = [1, 2, 3];
    try {
      ttt.loadBoard(playerNumberBoard);
      return {
        label: "board rejects invalid value",
        expression: ()=> false,
      };
    } catch(err) {
      if (err.message === "board values must be player numbers") {
        return {
			    label: "board rejects invalid value",
			    expression: ()=> true,
        };
      } else {
        // errored for a different reason
        return {
          label: "board rejects invalid value",
          expression: ()=> false,
        };
      }
    }
  }
];
