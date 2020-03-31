import { stringify } from 'querystring';
import { router } from 'umi';
import { getConfigTable, updateConfigTable } from '@/services/api';
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
    *fetchTableData({ payload }, { call, put, select }) {
      const { passKey } = yield select(_ => _.login)
      const tableData = yield call(getConfigTable, { passKey });
      yield put(
        {
          type: 'updateState',
          payload: { tableData: tableData } }
        );
    },
    *updateTableData({ payload }, { call, put, select }) {
      const { passKey } = yield select(_ => _.login)
      const tableData = yield call(updateConfigTable, { passKey });
      yield put(
        {
          type: 'updateState',
          payload: { tableData: tableData } }
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
