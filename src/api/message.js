import http from "./public";
// 获取未读消息数量
export const getUnInfoNum = params => {
  return http.fetchGet("message/getNum.do", params);
};
// 获取消息列表
export const getInfoList= params => {
  return http.fetchGet("message/list.do", params);
};
// 设置已读
export const setread= params => {
  return http.fetchGet("message/set_read.do", params);
};
// 删除已读消息
export const delread= params => {
  return http.fetchGet("message/deleteRead.do", params);
};
// 删除所有消息
export const delAll= params => {
  return http.fetchGet("message/deleteAll.do", params);
};
