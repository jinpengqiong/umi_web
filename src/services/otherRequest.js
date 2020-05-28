import request from "umi-request";

const {sha256} = require("js-sha256");

export const getXiaoMiApi = app_secret => {
  return request('/v1/trace/quota/get', {
    method: 'GET',
    headers: {
      "Authorization": `key=${app_secret}`
    },
  });
};

export const getOppoAuth = (data) => {
  const now = new Date().getTime();

  return request('/server/v1/auth', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      app_key: data.app_secret,
      sign: sha256(data.app_secret + now + data.mastersecret),
      timestamp: now
    }
  });
};

export const getOppoApi = app_secret => {
  return request('/server/v1/feedback/fetch_push_permit', {
    method: 'GET',
    headers: {
      "Authorization": `key=${app_secret}`
    },
  });
};
