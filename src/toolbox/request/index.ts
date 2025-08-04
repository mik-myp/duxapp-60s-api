// 定义一个请求配置，这个配置可以通用于请求和上传
const config = {
  config: {
    request: {
      origin: 'https://60s.viki.moe/v2', // 从用户配置读取请求域名
      contentType: 'application/json'
    },
    result: {
      code: 'statusCode',
      data: ['data', 'data'],
      successCode: 200,
      message: ['data', 'message']
    },
    upload: {
      api: 'member/upload', // 上传文件接口
      requestField: 'file',
      resultField: ['data', 'data', '0', 'url']
    }
  },
  // 默认使用的中间件（请求拦截）
  middle: { before: [], result: [], error: [] }
};

import {
  createRequest,
  createUpload,
  createRequestHooks
} from '@/duxapp/utils';

const {
  request,
  throttleRequest,
  middle: requestMiddle
} = createRequest(config);
const { upload, uploadTempFile, middle: uploadMiddle } = createUpload(config);
const { useRequest, usePageData } = createRequestHooks(request);

export {
  request,
  throttleRequest,
  requestMiddle,
  upload,
  uploadTempFile,
  uploadMiddle,
  useRequest,
  usePageData
};
