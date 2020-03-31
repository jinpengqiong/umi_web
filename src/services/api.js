import request from '@/utils/request';

export async function getConfigTable(params) {
         return request('/clientAppConfig/getConfig', {
           method: 'POST',
           params,
         });
       }
export async function updateConfigTable(params) {
         return request('/clientAppConfig/getConfig', {
           method: 'POST',
           params,
         });
       }

