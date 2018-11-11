import http from './public'
// 登陆
export const userLogin = (params) => {
    return http.fetchPost('user/login.do', params)
}
// 退出登陆
export const loginOut = (params) => {
    return http.fetchPost('user/logout.do', params)
}
// 注册账号
export const register = (params) => {
    return http.fetchPost('user/register.do', params)
}
//更新个人信息
export const update = (params) => {
    return http.fetchPost('user/update_information.do', params)
}
//上传用户头像
export const uploadImg = (params) => {
    return http.fetchGet('user/upload.do', params)
}
//更新个人密码
export const updatepassword = (params) => {
    return http.fetchPost('user/reset_password.do', params)
}
//获取搜索框的关键字
export const getKeyWord = params => {
  return http.fetchGet("search_words/list.do", params);
};

/**
 * 企业用户相关操作
 */

 //登陆
export const companyLogin = (params) => {
    return http.fetchPost('enter/user/login.do', params)
}
//保存企业信息
export const updateqyinfo = (params) => {
    return http.fetchPost('enter/user/update_information.do', params)
}
//更改密码
export const updateqypassword = (params) => {
    return http.fetchPost('enter/user/reset_password.do', params)
}
// 退出登陆
export const qyloginOut = (params) => {
    return http.fetchPost('enter/user/logout.do', params)
}