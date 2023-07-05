const { defineConfig } = require("@vue/cli-service");
let webpack = require("webpack");
module.exports = defineConfig({
  //基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  assetsDir: "static",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    client: {
      webSocketURL: "ws://0.0.0.0:9000/ws",
    },
    // open: true,
    proxy: {
      "/proxyServer1": {
        target: "https://restapi.amap.com", //代理服务server1 配置跨域请求的地址
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/proxyServer1": "" },
        // 如果代理到HTTPS服务器需要设置secure为true，默认为false
        secure: true,
      },
      "/proxyServer2": {
        // target: "http://localhost:3333", //代理服务server1 配置跨域请求的地址
        target: "http://localhost:3333", //代理服务server1 配置跨域请求的地址
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/proxyServer2": "" },
        // 如果代理到HTTPS服务器需要设置secure为true，默认为false
        secure: true,
      },
    },
  },
  configureWebpack: {
    //支持jquery
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  }
});
