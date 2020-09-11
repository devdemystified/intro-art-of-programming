[
  smokeTests,
  boardTests,
].forEach(eachTestSuite => { 
  eachTestSuite.forEach(e => { e(); });
});
