import http from "./public";
// 根据id获取产品信息
export const getProductById = params => {
  return http.fetchGet("product/detail.do", params);
};
// 获取分类
export const getCategory = params => {
  return http.fetchGet("category/list.do", params);
};
// 获取产品列表
export const getProductList = params => {
  return http.fetchGet("product/get_list.do", params);
};
// 获取产品列表
export const getProductListById = params => {
  return http.fetchGet("product/list_test.do", params);
};
export const getProductListFloor = params => {
  return http.fetchGet("product/list_floor.do", params);
};
// 获取热门产品
export const gethotList = params => {
  return http.fetchGet("hot_product/list.do", params);
};
// 搜索产品
export const getSearchList = params => {
  return http.fetchGet("product/list_keyword.do", params);
};
// 获取购物车列表
export const getCartList = params => {
  return http.fetchGet("cart/list.do", params);
};
// 加入购物车
export const addtoCart = params => {
  return http.fetchGet("cart/add.do", params);
};
// 删除购物车勾选商品
export const delCartChecked = params => {
  return http.fetchGet("cart/delete_product.do", params);
};
// 更新购物车数量
export const updateCartNumber = params => {
  return http.fetchGet("cart/update.do", params);
};
// 选中某个商品
export const selectProduct = params => {
  return http.fetchGet("cart/select.do", params);
};
// 选中某个商品带型号
export const selectProductWithXh = params => {
  return http.fetchGet("cart/select_model.do", params);
};
// 取消选中某个商品
export const cancleselectProduct = params => {
  return http.fetchGet("cart/un_select.do", params);
};
// 取消选中某个商品带型号
export const cancleselectProductWithXh = params => {
  return http.fetchGet("cart/un_select_model.do", params);
};
//全选商品
export const selectALLProduct = params => {
  return http.fetchGet("cart/select_all.do", params);
};
//取消全选
export const cancleselectALLProduct = params => {
  return http.fetchGet("cart/un_select_all.do", params);
};
//获取相似产品
export const getSimilarProduct = params => {
  return http.fetchGet("product/get_sug.do", params);
};
//猜你喜欢
export const getyoulike = params => {
  return http.fetchGet("product/love.do", params);
};
//查询商品是否已收藏
export const querycollect = params => {
  return http.fetchGet("product/query_collect.do", params);
};
//收藏商品
export const collectProduct = params => {
  return http.fetchGet("product/add_collect.do", params);
};
//取消收藏商品
export const delcollectProduct = params => {
  return http.fetchGet("product/delete_collect.do", params);
};
//获取收藏商品
export const getcollectProduct = params => {
  return http.fetchGet("product/get_collect.do", params);
};
//获取评论
export const getevalution = params => {
  return http.fetchGet("comment/list.do", params);
};

//根据品牌获取产品
export const getProductByBrand = params => {
  return http.fetchGet("product/list_brand.do", params);
};
