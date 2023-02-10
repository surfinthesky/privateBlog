import request from "@/api/request"; // 引入已经封装好的js文件，我这里叫request，根据自己需要修改。
export function refresh(data) {
  return request({
    url: 'proxyServer1/refresh', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//登录request
export function login(data) {
  return request({
    url: 'proxyServer2/loginperson', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//文章创建request
export function addarticle(data) {
  return request({
    url: 'proxyServer2/addarticle', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//获取文章request
export function getarticlelist(data) {
  return request({
    url: 'proxyServer2/articlepage', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//根据id删除文章request
export function articledelete(data) {
  return request({
    url: 'proxyServer2/articledelete', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//timeline创建request
export function addtimeline(data) {
  return request({
    url: 'proxyServer2/addtimeline', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//获取timeline
export function getTimelinelist(data) {
  return request({
    url: 'proxyServer2/timelinepage', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//获取ip详情
export function getIpdetails() {
  return request({
    url: 'proxyServer1?ip=114.247.50.2&output=json&key=b1c28ac7c16a6168087271355ae39a89', // 接口名称
    method: 'get', // 接口方法
  })
}