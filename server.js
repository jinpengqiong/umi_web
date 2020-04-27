const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const indexRouter = require('./src/services/router');
// const config = require('./server/config');
app.use(compression());

//模板配置
// app.set('views', path.join(__dirname, '/src/'));
// app.set('view engine', 'ejs');

// 静态资源配置
app.use('/', express.static(path.join(__dirname, 'dist')));

// api代理配置
app.use(
  '/api',
  proxy({
    target: 'http://52.201.31.131:8083',
    changeOrigin: true,
    xfwd: true,
  }),
);
app.use(
  '/permission',
  proxy({
    target: 'http://52.201.31.131:8084',
    changeOrigin: true,
    xfwd: true,
  }),
);
app.use(
  '/clientAppConfig/',
  proxy({
    target: 'http://52.201.31.131:8084',
    changeOrigin: true,
    xfwd: true,
  }),
);
app.use(
  '/clientAppInfo/',
  proxy({
    target: 'http://52.201.31.131:8084',
    changeOrigin: true,
    xfwd: true,
  }),
);
app.use(
  '/api/',
  proxy({
    target: 'http://52.201.31.131:8083',
    changeOrigin: true,
    xfwd: true,
  }),
);



// 路由配置
app.use('/', indexRouter);

// 404
app.use('*', (req, res) => {
  if (!res.headersSent) {
    res.render('404');
  }
});

// 监听端口
app.listen(8000, '0.0.0.0');
