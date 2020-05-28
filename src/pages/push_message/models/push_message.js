import {getTopicList, pushMessageUser, pushMessageVisitor, pushMessageInTopic, getConfigTable} from '@/services/api';
import {getXiaoMiApi, getOppoAuth, getOppoApi} from '@/services/otherRequest';
import {message} from 'antd';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const Model = {
  namespace: 'push_message',
  state: {
    clientList: [],
    submitLoading: false,
    topicList: [],
    loadingTopics: false,
    xiaoMiKeyList:[],
    oppoKeyList:[],
    xiaoMiData:{},
    oppoData:{
      remain_count:''
    }
  },
  effects: {
    *getXiaoMiApi({payload}, {call, put, select}) {
      const xiaoMiKeyList = yield select(state => state.push_message.xiaoMiKeyList);
      if (xiaoMiKeyList.length === 0) {
        const resp = yield call(getConfigTable, {
          passKey: userInfo.passKey,
          vendorType: 12,
        });
        if (resp.code === '200') {
          const pushSecretArr = resp.data.filter(item=>item.clientKey.includes('MI_PUSH_SECRET'));
          yield put({
            type: 'updateState',
            payload: { xiaoMiKeyList: pushSecretArr },
          });

          const keyObj = pushSecretArr.find(item=>item.clientId === payload)
          const xiaoMiApiresp = yield call(getXiaoMiApi, keyObj.clientValue);
          if (xiaoMiApiresp.result === 'ok') {
            yield put({
              type: 'updateState',
              payload: {xiaoMiData: xiaoMiApiresp.data.data},
            });
          }

        } else {
          yield put({type: 'global/responseError', payload: resp})
        }
      }else{

        const keyObj = xiaoMiKeyList.find(item=>item.clientId === payload);
        const xiaoMiApiresp = yield call(getXiaoMiApi, keyObj.clientValue);
        if (xiaoMiApiresp.result === 'ok') {
          yield put({
            type: 'updateState',
            payload: {xiaoMiData: xiaoMiApiresp.data.data},
          });
        }

      }

    },
    *getOppoApi({payload}, {call, put, select}) {
      const oppoKeyList = yield select(state => state.push_message.oppoKeyList);
      if (oppoKeyList.length === 0) {
        const resp = yield call(getConfigTable, {
          passKey: userInfo.passKey,
          vendorType: 14,
        });
        if (resp.code === '200') {
          const pushSecretArr = resp.data.filter(item=>item.clientKey.includes('OPPO_PUSH_APPKEY'));
          yield put({
            type: 'updateState',
            payload: { oppoKeyList: pushSecretArr },
          });

          const keyObj = pushSecretArr.find(item=>item.clientId === payload);
          const oppoAuthResp = yield call(getOppoAuth, {app_secret: keyObj.clientValue, mastersecret: keyObj.clientKey});
          if (oppoAuthResp.code === 0) {
            yield put({
              type: 'updateState',
              payload: {oppoData: oppoAuthResp.data},
            });
          }

        } else {
          yield put({type: 'global/responseError', payload: resp})
        }
      }else{

        const keyObj = oppoKeyList.find(item=>item.clientId === payload);
        const oppoApiResp = yield call(getOppoAuth, {app_secret: keyObj.clientValue, mastersecret: keyObj.clientKey});
        if (oppoApiResp.code === 0) {
          yield put({
            type: 'updateState',
            payload: {oppoData: oppoApiResp.data},
          });
        }

      }

    },
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
    * pushMessageInTopic({payload}, {call, put}) {
      yield put({type: 'changeLoading', payload: true});
      const resp = yield call(pushMessageInTopic, {
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
    * getTopicList({payload}, {call, put}) {
      yield put({type: 'changeLoadingTopic', payload: true});
      yield put({ type: 'updateState', payload: {topicList: []}});
      const resp = yield call(getTopicList, {
        clientId: payload,
        passKey: userInfo.passKey,
      });

      if (resp.code === '200') {
        yield put({
          type: 'updateState',
          payload: {topicList: resp.data},
        });
      } else {
        yield put({type: 'global/responseError', payload: resp})
      }
      yield put({type: 'changeLoadingTopic', payload: false});
    },
    * changeLoading({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {submitLoading: payload},
      });
    },
    * changeLoadingTopic({payload}, {put}) {
      yield put({
        type: 'updateState',
        payload: {loadingTopics: payload},
      });
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload};
    }
  },
};
export default Model;
