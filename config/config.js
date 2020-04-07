import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env; // const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'en-US',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: false,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // if (isAntDesignProPreview) {
//   // 针对 preview.pro.ant.design 的 GA 统计代码
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
//   plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
// }

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/application/config',
            },
            {
              path: '/application',
              name: 'Tenants Mode',
              icon: 'crown',
              component: './application/config',
              authority: ['admin'],
              routes: [
                {
                  path: '/application/config',
                  name: 'Clients',
                  icon: 'crown',
                  component: './application/config',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/push_services',
              name: 'Push Vendors',
              icon: 'crown',
              component: './push_service/Apple_APNS',
              authority: ['admin'],
              routes: [
                {
                  path: '/push_services/apple_apns',
                  name: 'APNS',
                  icon: 'crown',
                  component: './push_service/Apple_APNS',
                  authority: ['admin'],
                },
                {
                  name: 'FCM',
                  icon: 'crown',
                  path: '/push_services/google_fcm',
                  component: './push_service/google_fcm',
                },
                {
                  name: 'HuaWei HMS',
                  icon: 'crown',
                  path: '/push_services/huawei_hms',
                  component: './push_service/huawei_hms',
                },
                {
                  name: 'XiaoMi Push',
                  icon: 'crown',
                  path: '/push_services/xiaomi_push',
                  component: './push_service/Xiaomi_Push',
                },
                {
                  name: 'OPPO Push',
                  icon: 'crown',
                  path: '/push_services/opop_push',
                  component: './push_service/OPOP_Push',
                },
                {
                  name: 'Vivo Push',
                  icon: 'crown',
                  path: '/push_services/vivo_push',
                  component: './push_service/Vivo_Push',
                },
              ],
            },
            {
              name: 'Messaging',
              icon: 'crown',
              path: '/push_message',
              component: './Push_Message',
              authority: ['admin'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};

