import axios from "axios"; // 引入axios
// import { refresh } from "@/api/user"; // 封装好的refresh(鉴权需要刷新)接口
// 创建axios实例
const service = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === "production"
  //     ? ""
  //     : process.env.NODE_ENV === "pre"
  //     ? ""
  //     : "http://localhost:3333",
  timeout: 15000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    let token = sessionStorage.getItem("access_token"); // 我的用户权限token存储再sessionStorage中，可根据业务需要修改代码
    // console.log(token,'token')
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // 让请求header携带access_token。可根据业务需要修改代码
    }
    return config;
  },
  (error) => {
    console.log(error);
    this.$message({
      type: "warning",
      message: "请求异常，请稍后再试～",
    });
  }
);

// response拦截器，实现鉴权刷新
service.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config; // 可以试着打印config看看具体是些什么
    // console.log(error)
    // 这里我对多数的状态码进行了一个统一整理。
    if (error.response.status === 400) {
      this.$message({
        type: "warning",
        message: error.response.data.err_msg,
      });
    }
    if (error.response.status === 500) {
      this.$message({
        type: "warning",
        message: "请求异常，请稍后再试～",
      });
    }
    // 重点代码：当服务器返回401状态码时，使用refresh刷新接口更新已有token，再重复上一个接口请求，若失败，退出登录
    if (error.response.status === 401) {
      // console.log(config.url,'config.url')
      // console.log(config.baseURL,'config.baseURL')
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("refresh_token");
      return config;
    }
    return Promise.reject(error);
  }
);
export default service;
