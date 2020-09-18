const stateTests = [
  ()=>{
    return {
      label: "empty board returns 0",
      expression: ()=> {
        ttt.loadBoard([]);
        return ttt.gameState() === 0;
      }
    };
  },
  ()=>{
    return {
      label: "player one wins returns 1",
      expression: ()=> {
        ttt.loadBoard([1, 1, 1]);
        return ttt.gameState() === 1;
      }
    };
  },
  ()=>{
    return {
      label: "player two wins returns 2",
      expression: ()=> {
        ttt.loadBoard([2, 2, 2]);
        return ttt.gameState() === 2;
      }
    };
  },
  ()=>{
    return {
      label: "no winner returns 0",
      expression: ()=> {
        ttt.loadBoard([1, 2, 2, , , 1]);
        return ttt.gameState() === 0;
      }
    };
  },
  ()=>{
    return {
      label: "win by column one",
      expression: ()=> {
        ttt.loadBoard([1, 2, , 1, 2, , 1]);
        return ttt.gameState() === 1;
      }
    };
  },
  ()=>{
    return {
      label: "win by diagonal",
      expression: ()=> {
        ttt.loadBoard([1, 2, , , 1, 2, , 2, 1]);
        return ttt.gameState() === 1;
      }
    };
  },
];
