const { createProxyMiddleware } = require('http-proxy-middleware')

const API_TARGET = 'http://192.168.0.107:5029'
// const API_TARGET = 'http://123.57.86.56:16800'

module.exports = function (app) {
  // if (process.env.NODE_ENV === "development") {
  // }
  app.use("/api",
    createProxyMiddleware({
      target: API_TARGET,
      changeOrigin: true
    })
  )
}