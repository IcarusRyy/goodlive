const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
// const { createProxyMiddleware } = require('http-proxy-middleware')

app.use(cors())
app.use('/api', router)
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://bang.360.cn',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '',
//     },
//   }),
// )
app.listen(5566, () => {
  console.log('服务器运行在5566端口')
})
