//防抖
export function _debounce(fn, delay) {
  let newdelay = delay || 200;
  let timer;
  return function () {
    let th = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, newdelay);
  };
}
// 节流
export function _throttle(fn, interval) {
  let last;
  let timer;
  let newinterval = interval || 200;
  return function () {
    let th = this;
    let args = arguments;
    let now = +new Date();
    if (last && now - last < newinterval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, newinterval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  };
}
// 阻止浏览器滚动条事件
export function preventOverHidden() {
  document.documentElement.style.overflowY = "hidden";
}
export function preventOverauto() {
  document.documentElement.style.overflowY = "auto";
}
//loading加载
export function loading() {
  return this.$loading({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
}

/**
 * @description: 关键字查找
 * @return {*} []
 * @param {*} longstr
 * @param {*} findStr
 */
export function stringFind(longstr, findStr) {
  let selectArr = []; //集合
  let pos = longstr.indexOf(findStr);
  while (pos > -1) {
    selectArr.push(pos);
    pos = longstr.indexOf(findStr, pos + 1);
  }
  return selectArr;
}
/**
 * @description: 返回当前接受日期是星期几
 * @return {*} 周五
 * @param {*} day
 */
export function formdateDay(day) {
  let daylist = [
    {
      chtext: "周一",
      value: 1,
    },
    {
      chtext: "周二",
      value: 2,
    },
    {
      chtext: "周三",
      value: 3,
    },
    {
      chtext: "周四",
      value: 4,
    },
    {
      chtext: "周五",
      value: 5,
    },
    {
      chtext: "周六",
      value: 6,
    },
    {
      chtext: "周日",
      value: 0,
    },
  ];
  let nowDay = "";
  if (!day) {
    daylist.map((item) => {
      if (item.value == new Date().getDay()) {
        nowDay = item.chtext;
      }
    });
  } else {
    daylist.map((item) => {
      if (item.value == new Date(day).getDay()) {
        nowDay = item.chtext;
      }
    });
  }
  return nowDay;
}
