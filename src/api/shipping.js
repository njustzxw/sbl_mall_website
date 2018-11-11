
import http from './public'
//  获取收货地址列表
export const getaddressList = (params) => {
    return http.fetchGet('shipping/list.do', params)
}
//增加收货地址
export const addreciveAddress = (params) => {
    return http.fetchGet('shipping/add.do', params)
}
//设置默认收货地址
export const setDefualtAdress = (params) => {
    return http.fetchGet('shipping/set_default.do', params)
}
//删除收货地址
export const deleteAddress = (params) => {
    return http.fetchGet('shipping/delete.do', params)
}
//更新收货地址
export const updatereciveAddress = (params) => {
    return http.fetchGet('shipping/update.do', params)
}
/**
 * 企业地址
 */
//  获取企业收货地址列表
export const getqyaddressList = (params) => {
    return http.fetchGet('enter/shipping/list.do', params)
}
//设置默认收货地址
export const setqyDefualtAdress = (params) => {
    return http.fetchGet('enter/shipping/set_default.do', params)
}
//删除收货地址
export const deleteqyAddress = (params) => {
    return http.fetchGet('enter/shipping/delete.do', params)
}
//增加收货地址
export const addqyreciveAddress = (params) => {
    return http.fetchGet('enter/shipping/add.do', params)
}
//更新收货地址
export const updateqyreciveAddress = (params) => {
    return http.fetchGet('enter/shipping/update.do', params)
}

