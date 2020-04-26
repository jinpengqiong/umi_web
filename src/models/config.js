import { stringify } from 'querystring';
import { router } from 'umi';
import { getConfigTable, updateConfigTable, getClientList } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'config',
  state: {
    tableData: null,
    tableDataLoading: false,
    clientList: [],
    clientListLoading: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({ type: 'pathHandler', payload: { location } });
      });
    },
  },
  effects: {
    *fetchClientList(_, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { clientListLoading: true },
      });
      const resp = yield call(getClientList, {
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: { clientList: resp.data },
        });
      }
      yield put({
        type: 'updateState',
        payload: { clientListLoading: false },
      });
    },
    *fetchTableData({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { tableDataLoading: true },
      });
      const tableData = yield call(getConfigTable, {
        passKey: userInfo.passKey,
        vendorType: payload.vendorType,
      });
      if (tableData.code === '200') {
        yield put({
          type: 'updateState',
          payload: { tableData: tableData.data },
        });
      }
      yield put({
        type: 'updateState',
        payload: { tableDataLoading: false },
      });
    },
    *updateTableData({ payload }, { call, put }) {
      const response = yield call(updateConfigTable, {
        passKey: userInfo.passKey,
        id: payload.id,
        clientValue: payload.clientValue,
      });
      if (response.code === '200') {
        yield put({
          type: 'pathHandler',
          payload: { location: payload.location },
        });
      }
    },
    *pathHandler({ payload }, { call, put, select }) {
      switch (payload.location.pathname) {
        case '/application/config':
          yield put({ type: 'fetchClientList' });
          break;
        case '/push_message':
          const clientList =  yield select(state => state.config.clientList);
          if(clientList.length===0){
            yield put({ type: 'fetchClientList' });
          }
          break;
        case '/push_services/apple_apns':
          yield put({ type: 'fetchTableData', payload: { vendorType: 16 } });
          break;
        case '/push_services/google_fcm':
          yield put({ type: 'fetchTableData', payload: { vendorType: 11 } });
          break;
        case '/push_services/huawei_hms':
          yield put({ type: 'fetchTableData', payload: { vendorType: 13 } });
          break;
        case '/push_services/xiaomi_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 12 } });
          break;
        case '/push_services/opop_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 14 } });
          break;
        case '/push_services/vivo_push':
          yield put({ type: 'fetchTableData', payload: { vendorType: 15 } });
          break;
        default:
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
