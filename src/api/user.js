import request from "@/api/request"; // 引入已经封装好的js文件，我这里叫request，根据自己需要修改。
/**
 * @description: 获取用户地区信息
 * @return {*}
 */
export function getlocationIp() {
  return request({
    url: "proxyServer2/getlocationIp", // 接口名称
    method: "post", // 接口方法
  });
}
/**
 * @description: 天气接口
 * @return {*}  // "daily": [{                          //返回指定days天数的结果
  //   "date": "2015-09-20",              //日期
  //   "text_day": "多云",                //白天天气现象文字
  //   "code_day": "4",                  //白天天气现象代码
  //   "text_night": "晴",               //晚间天气现象文字
  //   "code_night": "0",                //晚间天气现象代码
  //   "high": "26",                     //当天最高温度
  //   "low": "17",                      //当天最低温度
  //   "precip": "0",                    //降水概率，范围0~100，单位百分比（目前仅支持国外城市）
  //   "wind_direction": "",             //风向文字
  //   "wind_direction_degree": "255",   //风向角度，范围0~360
  //   "wind_speed": "9.66",             //风速，单位km/h（当unit=c时）、mph（当unit=f时）
  //   "wind_scale": "",                 //风力等级
  //   "rainfall": "0.0",                //降水量，单位mm
  //   "humidity": "76"                  //相对湿度，0~100，单位为百分比
 * @param {*} id //接受地区locationid
 */
export function getlocalWeather(id) {
  return request({
    url: `proxyServer2/getWeather?locationid=${id}`, // 接口名称
    method: "get", // 接口方法
  });
}
// https://restapi.amap.com/v3/ip?ip=&output=json&key=b1c28ac7c16a6168087271355ae39a89
export function refresh(data) {
  return request({
    url: "proxyServer1/refresh", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//登录request
export function login(data) {
  return request({
    url: "proxyServer2/loginperson", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//文章创建request
export function addarticle(data) {
  return request({
    url: "proxyServer2/addarticle", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//获取文章request
export function getarticlelist(data) {
  return request({
    url: "proxyServer2/articlepage", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//更新文章request
export function updatearticle(data) {
  return request({
    url: "proxyServer2/articleupdate", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//根据id删除文章request
export function articledelete(data) {
  return request({
    url: "proxyServer2/articledelete", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//文章分类 request
export function articlesort() {
  return request({
    url: "proxyServer2/articlesort", // 接口名称
    method: "post", // 接口方法
    data: {
      sortText: "articleDiff",
    }, // 参数
  });
}
//timeline添加request
export function addtimeline(data) {
  return request({
    url: "proxyServer2/addtimeline", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//获取timeline列表 request
export function getTimelinelist(data) {
  return request({
    url: "proxyServer2/timelinepage", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//更新timeline request
export function updatetimeline(data) {
  return request({
    url: "proxyServer2/timelineupdate", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//删除timeline request
export function timelinedelete(data) {
  return request({
    url: "proxyServer2/timelinedelete", // 接口名称
    method: "post", // 接口方法
    data: data, // 参数
  });
}
//获取ip详情
export function getIpdetails() {
  return request({
    url: "proxyServer1?ip=114.247.50.2&output=json&key=b1c28ac7c16a6168087271355ae39a89", // 接口名称
    method: "get", // 接口方法
  });
}
//获取热门文章前5
export function articleHotList() {
  return request({
    url: "proxyServer2/articleHotlist", // 接口名称
    method: "post", // 接口方法
  });
}
//根据id获取文章
export function getArticledetail(data) {
  return request({
    url: "proxyServer2/articledetail", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
//获取所有的留言
export function getreplyMessgaelist(data) {
  return request({
    url: "proxyServer2/replyMessgaelist", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
/**
 * @description: 根据id获取用户信息
 * @return {*}
 * @param {*} data
 */
export function getuserInfo(data) {
  return request({
    url: "proxyServer2/getuserInfo", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
/**
 * @description: 添加用户留言
 * @return {*}
 * @param {*} data
 */
export function insertMessage(data) {
  return request({
    url: "proxyServer2/insertMessage", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
/**
 * @description: 添加用户
 * @return {*}
 * @param {*} data
 */
export function registerUser(data) {
  return request({
    url: "proxyServer2/register", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
export function getAllmessage(data) {
  return request({
    url: "proxyServer2/getAllmessage", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
export function deleteMessage(data) {
  return request({
    url: "proxyServer2/deleteMessage", // 接口名称
    method: "post", // 接口方法
    data,
  });
}
