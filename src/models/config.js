import { stringify } from 'querystring';
import { router } from 'umi';
import { getConfigTable } from '@/services/api';
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
        if (location.pathname === '/application/config') {
          dispatch({ type: 'fetchTableData' });
        }
      });
    },
  },
  effects: {
    *fetchTableData({ payload }, { call, put }) {
      const tableData = yield call(getConfigTable);
      yield put(
        {
          type: 'updateState',
          payload: { tableData } }
        );
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
