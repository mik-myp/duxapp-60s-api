import { request } from '../request';

export function getOg(data) {
  return request({
    url: 'og',
    data
  });
}

export function getHash(data) {
  return request({
    url: 'hash',
    data
  });
}
