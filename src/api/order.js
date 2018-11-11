import http from "./public";
// 创建订单
export const createOrder = params => {
    return http.fetchGet("order/create.do", params);
};
//获取订单列表
export const getOrderList = params => {
    return http.fetchGet("order/list.do", params);
};
//获取订单详情
export const getOrderDetail = params => {
    return http.fetchGet("order/detail.do", params);
};
//取消订单
export const cancleOrder = params => {
    return http.fetchGet("order/cancel.do", params);
};
//支付
export const getPayOrder = params => {
    return http.fetchGet("order/pay.do", params);
};
//银联支付
export const unionPay = params => {
    return http.fetchGet("unionPay/pay.do", params);
};
//线下结账
export const payOffLine = params => {
    return http.fetchGet("order/set_pay.do", params);
};
//查询支付状态
export const queryPay = params => {
    return http.fetchGet("order/query.do", params);
};
//提交审核
export const submitCheck = params => {
    return http.fetchGet("order/submit.do", params);
};
//获取等待审核订单列表
export const getCheck = params => {
    return http.fetchGet("order/get_check.do", params);
};
//审核订单
export const check = params => {
    return http.fetchGet("order/check.do", params);
};
//删除订单
export const delOrder = params => {
    return http.fetchGet("order/delete.do", params);
};
//确认收货
export const confirmRecive = params => {
    return http.fetchGet("order/confirm.do", params);
};
//获取物流信息
export const getLogisticInfo = params => {
    return http.fetchOtherGet("", params);
};
//立即购买
export const quickCreate = params => {
    return http.fetchGet("order/quick_create.do", params);
};
//售后服务
export const drawback = params => {
    return http.fetchGet("order/create_drawback.do", params);
};
//评论
export const evalute = params => {
    return http.fetchGet("comment/add.do", params);
};
//评论
export const moreevalute = params => {
    return http.fetchGet("comment/add_newcontent.do", params);
};

//下载订单
export const downloadOrder = params => {
    return http.fetchGet("order/select_order.do", params);
};