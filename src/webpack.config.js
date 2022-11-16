const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development", // 热更新只有开发环境才使用
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  // 注意在这里配置的loader
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // css 解析配置
      },
    ],
  },
  plugins:[
      new webpack.HotModuleReplacementPlugin(), // hot: true 会自动引入这个 plugin
  ],
  devServer: {
    // 配置devServer
    contentBase: "./public", // 额外指明静态资源目录
    proxy: {
      // 添加代理服务配置
      "/api": {
        // 需要被代理的请求路径前缀
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: "https://api.github.com", // 代理目标
        // ----------------------注意下面pathRewrite 和上面是两种情况一般二选一---------------------------------------
        // 但是我们需要请求的接口地址没有/api
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          // 代理路径重写
          "^/api": "",
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        changeOrigin: true, // 以实际代理请求的主机名请求
      },
      open: true, // 自动打开浏览器
      port: 3000, // 设置启动时候的运行端口
      contentBase: "./dist", // 指定托管的根目录
      hot: true, // 启用热更新
      // hotOnly: true // 代码报错会显示错误信息不回进行热更新，hot 遇到报错会进行上一次的更新导致没有错误信息
    },
  },
};
