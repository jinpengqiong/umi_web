import {pushMessageUser, pushMessageVisitor} from '@/services/api';
import {message} from 'antd';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'push_message',
  state: {
    clientList: [],
    submitLoading: false,
  },
  // subscriptions: {
  //   setup({dispatch, history}) {
  //     dispatch({type: 'config/fetchClientList'});
  //   },
  // },
  effects: {
    * pushMessageUser({payload}, {call, put}) {
      yield put({type: 'changeLoading', payload: true});
      const resp = yield call(pushMessageUser, {
        broadcastObject: JSON.stringify(payload),
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        message.success('Submit successfully!');
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
      yield put({type: 'changeLoading', payload: false});
    },
    * pushMessageVisitor({payload}, {call, put}) {
      yield put({type: 'changeLoading', payload: true});
      const resp = yield call(pushMessageVisitor, {
        broadcastObject: JSON.stringify(payload),
        passKey: userInfo.passKey,
      });
      if (resp.code === '200') {
        message.success('Submit successfully!');
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
      yield put({type: 'changeLoading', payload: false});
    },
    * changeLoading({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {submitLoading: payload},
      });
    },
  },
  reducers: {
    // updateState(state, {payload}) {
    //   return {...state, ...payload};
    // },
  },
};
export default Model;
