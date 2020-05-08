import {getTopicList, createTopic, removeTopic} from '@/services/api';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const clientList = JSON.parse(sessionStorage.getItem('clientList'));
const pKey = userInfo.passKey;

const Model = {
  namespace: 'topic',
  state: {
    modelVisible: false,
    clientId: clientList[0].clientId,
    topicList: [],
    topicListLoading: false
  },
  effects: {
    * changeVisible({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {modelVisible: payload},
      });
    },
    * changeClient({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {clientId: payload},
      });
      yield put({type: 'topic/getTopicList'})
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
        passKey: pKey,
      });

      yield put({
        type: 'updateState',
        payload: {topicListLoading: false},
      });

      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: {topicList: resp.data},
        });
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
    },
    * createTopic({payload}, {call, put, select}) {
      const cId = yield select(
        state => state.topic.clientId
      );
      const resp = yield call(createTopic, {
        clientId: cId,
        passKey: pKey,
        ...payload
      });

      if (resp.code === '200') {
        yield put({type: 'topic/changeVisible', payload: false,});
        yield put({type: 'topic/getTopicList'});
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
    },
    * removeTopic({payload}, {call, put, select}) {
      const cId = yield select(
        state => state.topic.clientId
      );
      const resp = yield call(removeTopic, {
        clientId: cId,
        passKey: pKey,
        topicName: payload
      });

      if (resp.code === '200') {
        yield put({type: 'topic/getTopicList'});
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload};
    }
  },
};
export default Model;
