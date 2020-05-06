import request from '@/utils/request';

export const getConfigTable = params => {
  return request('/clientAppConfig/getConfig', {
    method: 'POST',
    params,
  });
};

export const updateConfigTable = params => {
  return request('/clientAppConfig/updateConfig', {
    method: 'POST',
    params,
  });
};

export const getClientList = params => {
  return request('/clientAppInfo/getAllInfo', {
    method: 'POST',
    params,
  });
};

export const pushMessageUser = params => {
  return request('/api/pushMessageInUserMode', {
    method: 'POST',
    params,
  });
};

export const pushMessageVisitor = params => {
  return request('/api/pushMessageInVisitorMode', {
    method: 'POST',
    params,
  });
};

export const getTopicList = params => {
  return request('/topic/selectTopicListByClientId', {
    method: 'POST',
    params,
  });
};

export const createTopic = params => {
  return request('/topic/createTopic', {
    method: 'POST',
    params,
  });
};

export const removeTopic = params => {
  return request('/topic/removTopic', {
    method: 'POST',
    params,
  });
};

