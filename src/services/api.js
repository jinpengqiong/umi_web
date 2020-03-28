import request from '@/utils/request';

export async function getConfigTable() {
  return request('/api/getConfigTable');
}

