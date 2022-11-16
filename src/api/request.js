import axios from "axios"; // 引入axios
import { refresh } from "@/api/user"; // 封装好的refresh(鉴权需要刷新)接口
// 创建axios实例
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? ""
      : process.env.NODE_ENV === "pre"
      ? ""
      : "http://127.0.0.1:8888",
  timeout: 15000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    let token = sessionStorage.getItem("access_token"); // 我的用户权限token存储再sessionStorage中，可根据业务需要修改代码
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // 让请求header携带access_token。可根据业务需要修改代码
    }
    return config;
  },
  (error) => {
    this.$message({
      type: "warning",
      message: "请求异常，请稍后再试～",
    });
  }
);

// respone拦截器，实现鉴权刷新
service.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config; // 可以试着打印config看看具体是些什么
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
      if (config.url != config.baseURL + "/refresh") {
        // 判断上一次请求是否是刷新请求。不判断的话，容易出现一直刷新的bug
        const retryreq = new Promise((resolve, reject) => {
          // 必须使用promise，否则不会被返回执行上一布操作
          // 使用refresh接口
          refresh({ refresh_token: sessionStorage.getItem("refresh_token") })
            .then((res) => {
              let data = res.data.data;
              // 更新token
              sessionStorage.setItem("refresh_token", data.refresh_token);
              sessionStorage.setItem("access_token", data.access_token);
              config.headers["Authorization"] =
                "Bearer " + sessionStorage.getItem("access_token");
              config.baseURL = "";
              resolve(service(config)); // 必须resolve
            })
            .catch((error) => {
              console.log(error);
            });
        });
        return retryreq;
      } else {
        // 如果刷新失败重新登录
        this.$message({
          type: "warning",
          message: "登录失效，请重新登录",
        });
        removeToken();
        sessionStorage.clear();
        location.reload();
      }
    }
    return Promise.reject(error);
  }
);
export default service;
