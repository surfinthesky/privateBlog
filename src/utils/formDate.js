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
function getDateFormat(time) {
  if (!time) return
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
function getDateFormatComplete(time) {
  if (!time) return
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
}
export { getFuturePastDay, getDateFormat,getDateFormatComplete};
