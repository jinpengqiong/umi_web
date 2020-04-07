import { stringify } from 'querystring';
import { router } from 'umi';
import { getConfigTable, updateConfigTable } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

const Model = {
  namespace: 'config',
  state: {
    tableData: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log('location', location.pathname);
        if (
          location.pathname === '/' ||
          location.pathname === '/application/config'
        ) {
          dispatch({ type: 'fetchTableData' });
        }
      });
    },
  },
  effects: {
    *fetchTableData(_, { call, put, select }) {
      const tableData = yield call(getConfigTable, { passKey: userInfo.passKey });
      yield put({
        type: 'updateState',
        payload: { tableData: tableData },
      });
    },
    *updateTableData({ payload }, { call, put, select }) {
      const response = yield call(updateConfigTable, {
        passKey: userInfo.passKey,
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
