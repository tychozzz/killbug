import request from '../util/request';

// interface PageQuery {
//   pageNum: number;
//   pageSize: number;
// }

// export const getList = (data: PageQuery) => {
//   let pageNum = data.pageNum
//   let pageSize = data.pageSize
//   return request.get(`/index/getList/${pageNum}/${pageSize}`);
// };

// export const getList = (token: string) => {
//   return request.get('/index/getList', { headers: { Authorization: token } });
// };

export const getList = (token: string='') => {
  return request.get('/index/getList', { headers: { Authorization: token } });
};

// export const getList = () => {
//   return request.get('/index/getList');
// }