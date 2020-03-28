import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'config',
  state: {
    tableData: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {

      });
    },
  },
  effects: {
    *fetchTableData({ payload }, { call, put }) {
      
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
