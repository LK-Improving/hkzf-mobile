const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api',{ // 遇见/api前缀的请求，就会触发该代理配置
            target: 'http://localhost:5000', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的响应头中的Host字段的值
            pathRewrite: {'/api': ''} // 重写请求路径
        }),
        // createProxyMiddleware('/api2',{
        //     target:'http://localhost:5001',
        //     changeOrigin: true,
        //     pathRewrite:{'/apo2':''}
        // })
    )
}