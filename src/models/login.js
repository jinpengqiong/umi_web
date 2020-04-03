import { stringify } from 'querystring';
import { router } from 'umi';
import { AccountLogin, getFakeCaptcha, fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    passKey: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, {
        username: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      });
      // const response = yield call(fakeAccountLogin, payload);
      console.log('response', response);
      response.currentAuthority = 'admin';
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if (response.code === '200') {
        const userInfo = {
          name: 'Admin',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          userid: '00000001',
        };
        yield put({
          type: 'user/fetchCurrent',
          payload: userInfo,
        }); // Login successfully
        sessionStorage.setItem('user', JSON.stringify(userInfo));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        console.log('redirect', redirect);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          console.log('redirectUrlParams', redirectUrlParams);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, passKey: payload.passKey };
    },
  },
};
export default Model;
