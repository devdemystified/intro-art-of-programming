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
];
