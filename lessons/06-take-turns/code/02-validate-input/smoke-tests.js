const smokeTests = [
  ()=>{
    return {
      label: "ttt defined",
      expression: ()=> ttt !== undefined,
    };
  },
  ()=>{
    return {
      label: "can validate turn input",
      expression: ()=> ttt.validateTurnInput !== undefined,
    };
  },
];
