const turnTests = [
  ()=>{
    return {
      label: "errors without two arguments",
      expression: ()=> {
        try {
          ttt.validateTurnInput(1);
          return false;
        } catch (err) {
          return err.message === "requires both player and position";
        }
      },
    };
  },
  ()=>{
    return {
      label: "turn requires valid player number",
      expression: ()=> {
        try {
          ttt.validateTurnInput(0, 0);
          return false;
        } catch (err) {
          return err.message === "invalid player number";
        }
      },
    };
  },
  ()=>{
    return {
      label: "turn can't take occupied board position",
      expression: ()=> {
        ttt.loadBoard([1]);
        try {
          ttt.validateTurnInput(1, 0);
          return false;
        } catch (err) {
          return err.message === "board position occupied";
        }
      },
    };
  },
  ()=>{
    return {
      label: "mark the board position",
      expression: ()=> {
        ttt.loadBoard([]);
        ttt.markBoard(1, 0);
        return ttt.board[0] === 1;
      },
    };
  },
];
