import request from "@/api/request"; // 引入已经封装好的js文件，我这里叫request，根据自己需要修改。
export function refresh(data) {
  return request({
    url: '/refresh', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//登录request
export function login(data) {
  return request({
    url: '/loginperson', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//文章创建request
export function addarticle(data) {
  return request({
    url: '/addarticle', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}
//获取文章request
export function getarticlelist(data) {
  return request({
    url: '/articlepage', // 接口名称
    method: 'post', // 接口方法
    data: data // 参数
  })
}


const pro1 = new Promise((resolve) => {
  resolve(1);
})
const pro2 = new Promise((resolve) => {
  resolve(2);
})

export function getUserlist() {
 return Promise.all([pro1, pro2]).then((values) => {
    return new Promise((resolve) => {
      console.log(values)
      resolve(values)
    })
  });
}