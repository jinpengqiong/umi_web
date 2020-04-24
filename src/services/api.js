import request from '@/utils/request';

export async function getConfigTable(params) {
  return request('/clientAppConfig/getConfig', {
    method: 'POST',
    params,
  });
}
export async function updateConfigTable(params) {
  return request('/clientAppConfig/updateConfig', {
    method: 'POST',
    params,
  });
}
export async function getClientList(params) {
  return request('/clientAppInfo/getAllInfo', {
    method: 'POST',
    params,
  });
}
export async function pushMessageUser(params) {
  return request('/api/pushMessageInUserMode', {
    method: 'POST',
    params,
  });
}
export async function pushMessageVisitor(params) {
  return request('/api/pushMessageInVisitorMode', {
    method: 'POST',
    params,
  });
}
