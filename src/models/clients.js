import {getClientList} from '@/services/api';

const Model = {
  namespace: 'clients',
  state: {
    clientList: [],
    clientListLoading: false
  },
  effects: {
    *fetchClientList(_, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { clientListLoading: true },
      });
      const resp = yield call(getClientList, {
        passKey: JSON.parse(sessionStorage.getItem('userInfo')).passKey,
      });
      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: {clientList: resp.data},
        });
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
      yield put({
        type: 'updateState',
        payload: { clientListLoading: false },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
export default Model;
