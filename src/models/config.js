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
          console.log('object')
          dispatch({ type: 'fetchTableData' });
        }
      });
    },
  },
  effects: {
    *fetchTableData(_, { call, put, select }) {
      const { passKey } = yield select(_ => _.login);
      const tableData = yield call(getConfigTable, { passKey });
      yield put({
        type: 'updateState',
        payload: { tableData: tableData },
      });
    },
    *updateTableData({ payload }, { call, put, select }) {
      const { passKey } = yield select(_ => _.login);
      const response = yield call(updateConfigTable, {
        passKey,
        id: payload.id,
        clientValue: payload.clientValue,
      });
      if (response.code === '200') {
        yield put({
          type: 'fetchTableData',
        });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
