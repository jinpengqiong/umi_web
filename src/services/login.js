import request from '@/utils/request';
export async function AccountLogin(params) {
  return request(
    '/permission/getPassKey?username=admin&password=e10adc3949ba59abbe56e057f20f883e',
    {
      method: 'POST',
      data: undefined,
    },
  );
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
