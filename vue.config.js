const {
  defineConfig
} = require("@vue/cli-service");
let webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    // open: true,
    proxy: {
      "/proxyServer1": {
        target: "https://restapi.amap.com/v3/ip?", //代理服务server1 配置跨域请求的地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/proxyServer1": "/"
        }
      },
    }
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
  },
});