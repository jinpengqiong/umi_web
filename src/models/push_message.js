import { getClientList, pushMessageUser, pushMessageVisitor } from '@/services/api';
import { message } from 'antd';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'push_message',
  state: {
    clientList: [],
    submitLoading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'fetchClientList' });
    },
  },
  effects: {
    *fetchClientList(_, { call, put }) {
      const resp = yield call(getClientList, {
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: { clientList: resp.data },
        });
      }
    },
    *pushMessageUser({ payload }, { call, put, select }) {
      yield put({ type: 'changeLoading', payload: true });
      const resp = yield call(pushMessageUser, {
        broadcastObject: JSON.stringify(payload),
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        message.success('Submit successfully!');
      }
      yield put({ type: 'changeLoading', payload: false });
    },
    *pushMessageVisitor({ payload }, { call, put, select }) {
      yield put({ type: 'changeLoading', payload: true });
      const resp = yield call(pushMessageVisitor, {
        broadcastObject: JSON.stringify(payload),
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        message.success('Submit successfully!');
      }
      yield put({ type: 'changeLoading', payload: false });
    },
    *changeLoading({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submitLoading: payload },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
