module.exports = {
    devServer: {
        proxy: {
            "/proxyServer1": {
                target: "https://restapi.amap.com/v3/ip", //代理服务server1 配置跨域请求的地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/proxyServer1": ""
                }
            },
        }
    }
}