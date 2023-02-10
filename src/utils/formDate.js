//
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
//返回格式：2023-01-11 10：32：30
function getDateFormat(time) {
  if (!time) return;
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}
//返回格式：2023-01-11
function getDateFormatComplete(time) {
  if (!time) return;
  let date = new Date(time);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
}
// ['2023-1-5', '2023-1-6', '2023-1-7', '2023-1-8', '2023-1-9', '2023-1-10', '2023-1-11']
function getOverday(day) {
  let nowdate = new Date();
  let base = new Date(nowdate).getTime();
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  let time = new Date(base);
  date.push(
    [
      time.getFullYear(),
      time.getMonth() + 1 > 9
        ? `${time.getMonth() + 1}`
        : 0 + `${time.getMonth() + 1}`,
      time.getDate() > 9 ? time.getDate() : 0 + time.getDate(),
    ].join("-")
  );
  for (let i = 1; i < day; i++) {
    //控制需要的天数
    let now = new Date((base -= oneDay)); //这里控制往前一周还是往后一周
    date.push(
      [
        now.getFullYear(),
        now.getMonth() + 1 > 9
          ? `${now.getMonth() + 1}`
          : 0 + `${now.getMonth() + 1}`,
        now.getDate() > 9 ? now.getDate() : 0 + `${now.getDate()}`,
      ].join("-")
    );
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  let newdate = date.reverse(); //往后一周的话需要将数组倒叙，完后不需要
  return newdate;
}
export { getFuturePastDay, getDateFormat, getDateFormatComplete, getOverday };
