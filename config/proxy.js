/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api': {
      target: 'http://52.201.31.131:8083',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/permission': {
      target: 'http://52.201.31.131:8084',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/clientAppConfig/': {
      target: 'http://52.201.31.131:8084',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/clientAppInfo/': {
      target: 'http://52.201.31.131:8084',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/': {
      target: 'http://52.201.31.131:8083',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/topic/': {
      target: 'http://52.201.31.131:8083',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/v1/trace/quota/get': {
      target: 'https://api.xmpush.xiaomi.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/server/v1/feedback/fetch_push_permit': {
      target: 'https://feedback.push.oppomobile.com/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/server/v1/auth': {
      target: 'https://feedback.push.oppomobile.com/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api': {
      target: 'http://52.201.31.131:8084',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
