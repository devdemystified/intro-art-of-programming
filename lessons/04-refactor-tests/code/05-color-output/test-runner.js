[
  smokeTests,
  boardTests,
].forEach(eachTestSuite => { 
  eachTestSuite.forEach(e => {
    const result = e();
    const errorColor = "\x1b[31m%s\x1b[0m";
    const regularColor = "\x1b[2m%s\x1b[0m";
    if (!result.expression()) {
      console.log(
        errorColor,
        result.label + " false"
      );
      return;
    }
    console.log(
      regularColor,
      result.label, 
      true
    );
  });
});
