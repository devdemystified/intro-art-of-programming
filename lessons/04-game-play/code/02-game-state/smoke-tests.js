const smokeTests = [
  ()=>{
    return {
      label: "ttt defined",
      expression: ()=> ttt !== undefined,
    };
  },
  ()=>{
    return {
      label: "can check state",
      expression: ()=> ttt.gameState() !== undefined,
    };
  },
];
