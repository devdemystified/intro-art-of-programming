[
  smokeTests,
  boardTests,
].forEach(eachTestSuite => { 
  eachTestSuite.forEach(e => {
    const result = e();
    console.log(result.label, result.expression());
  });
});
