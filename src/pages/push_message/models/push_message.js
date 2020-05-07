import {getTopicList, pushMessageUser, pushMessageVisitor} from '@/services/api';
import {message} from 'antd';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'push_message',
  state: {
    clientList: [],
    submitLoading: false,
    topicList: []
  },
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
    * getTopicList(_, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {topicListLoading: true},
      });
      const cId = yield select(
        state => state.topic.clientId
      );
      const resp = yield call(getTopicList, {
        clientId: cId,
        passKey: userInfo.passKey,
      });

      yield put({
        type: 'updateState',
        payload: {topicListLoading: false},
      });

      const mockData = {"code":"200","remark":"Succeed.","data":[{"id":1,"topic":"test1","clientId":"VisitorApp1","createTime":1588238742969,"deleteFlag":0}]};
      if (mockData.code === '200') {
        yield put({
          type: 'updateState',
          payload: {topicList: mockData.data},
        });
      }
    },
    * changeLoading({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {submitLoading: payload},
      });
    },
  }
};
export default Model;
