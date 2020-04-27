import { getConfigTable, updateConfigTable } from '@/services/api';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'push_service',
  state: {
    tableData: null,
    tableDataLoading: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({ type: 'pathHandler', payload: { location } });
      });
    },
  },
  effects: {
    *fetchTableData({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { tableDataLoading: true },
      });
      const resp = yield call(getConfigTable, {
        passKey: userInfo.passKey,
        vendorType: payload.vendorType,
      });
      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: { tableData: resp.data },
        });
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
      yield put({
        type: 'updateState',
        payload: { tableDataLoading: false },
      });
    },
    *updateTableData({ payload }, { call, put }) {
      const resp = yield call(updateConfigTable, {
        passKey: userInfo.passKey,
        id: payload.id,
        clientValue: payload.clientValue,
      });
      if (resp.code === '200') {
        yield put({
          type: 'pathHandler',
          payload: { location: payload.location },
        });
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
    },
    *pathHandler({ payload }, { call, put, select }) {
      switch (payload.location.pathname) {
        case '/push_service/apple_apns':
          yield put({ type: 'fetchTableData', payload: { vendorType: 16 } });
          break;
        case '/push_service/google_fcm':
          yield put({ type: 'fetchTableData', payload: { vendorType: 11 } });
          break;
        case '/push_service/huawei_hms':
          yield put({ type: 'fetchTableData', payload: { vendorType: 13 } });
          break;
        case '/push_service/xiaomi_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 12 } });
          break;
        case '/push_service/opop_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 14 } });
          break;
        case '/push_service/vivo_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 15 } });
          break;
        default:
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
export default Model;
