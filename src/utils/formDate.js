function getFuturePastDay() {
  let nfOptionsArray = new Array();
  let years = new Date().getFullYear();
  for (let i = years - 3; i <= years + 3; i++) {
    let anOption = {};
    anOption.name = i;
    anOption.value = i;
    nfOptionsArray.push(anOption);
  }
}

export { getFuturePastDay };
