import Vue from "vue";
import {
    setStore,
    getStore,
    removeStore
} from "@/utils/storage";
import Cookies from "js-cookie";
import {
    getCartList,
    delCartChecked,
    updateCartNumber,
    addtoCart,
    selectProduct,
    cancleselectProduct,
    selectProductWithXh,
    cancleselectProductWithXh,
    selectALLProduct,
    cancleselectALLProduct,
} from "@/api/goods";
export default {
    state: {
        cartList: [],
        purchnowList: {},
        imageHost: "",
        productionNum: 0,
        cartTotalPrice: 0,
        checked: 0,
        allchecked: false,
        keyword: "",
        currentCatogoryId: "",
        refundinfo:{},
        evaluationinfo:{},
        evaluationinfochild:0,
    },
    getters: {
        // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
    },
    mutations: {
        purchnowlist(state, product) {
            console.log(product)
            state.purchnowList = product
            setStore('purchnowproduct', product)
        },
        addCart(state, product) {
            let params;
            if (product.modelId) {
                params = {
                    modelId: product.modelId,
                    productId: product.id ? product.id : product.productId,
                    count: 1
                };
            } else {
                params = {
                    productId: product.id ? product.id : product.productId,
                    count: 1
                };
            }
            addtoCart(params).then(res => {
                Vue.prototype.$Message.success("加入购物车成功！");
                state.cartList = res.data.cartProductVoList;
                state.imageHost = res.data.imageHost;
                state.cartTotalPrice = res.data.cartTotalPrice;
                state.allchecked = res.data.allchecked;
                state.productionNum = 0;
                for (let obj of res.data.cartProductVoList) {
                    if (obj.productModelVoList) {
                        for (let item of obj.productModelVoList) {
                            state.productionNum += item.quantity;
                        }
                    }
                    state.productionNum += obj.quantity;
                }
            });
        },
        addCart1(state, product) {
            let params;
            if (product.modelId) {
                params = {
                    modelId: product.modelId,
                    productId: product.id,
                    count: product.count
                };
            } else {
                params = {
                    productId: product.id,
                    count: product.count
                };
            }
            addtoCart(params).then(res => {
                Vue.prototype.$Message.success("加入购物车成功！");
                state.cartList = res.data.cartProductVoList;
                state.imageHost = res.data.imageHost;
                state.cartTotalPrice = res.data.cartTotalPrice;
                state.allchecked = res.data.allchecked;
                state.productionNum = 0;
                for (let obj of res.data.cartProductVoList) {
                    if (obj.productModelVoList) {
                        for (let item of obj.productModelVoList) {
                            state.productionNum += item.quantity;
                        }
                    }
                    state.productionNum += obj.quantity;
                }
            });
        },
        //重新编辑订单
        reditorder(state, productlist) {
            console.log(productlist)
            for (let obj of productlist) {
                let params;
                if (product.modelId) {
                    params = {
                        modelId: obj.modelId,
                        productId: obj.productId,
                        count: obj.quantity
                    };
                } else {
                    params = {
                        productId: obj.productId,
                        count: obj.quantity
                    };
                }
                addtoCart(params).then(res => {
                    state.cartList = res.data.cartProductVoList;
                    state.imageHost = res.data.imageHost;
                    state.cartTotalPrice = res.data.cartTotalPrice;
                    state.allchecked = res.data.allchecked;
                    state.productionNum = 0;
                    for (let obj of res.data.cartProductVoList) {
                        if (obj.productModelVoList) {
                            for (let item of obj.productModelVoList) {
                                state.productionNum += item.quantity;
                            }
                        }
                        state.productionNum += obj.quantity;
                    }
                });
            }
        },
        //获取购物车
        getCart(state) {
            if (!Cookies.get('userlogfag')) return;
            getCartList().then(res => {
                state.cartList = res.data.cartProductVoList;
                state.imageHost = res.data.imageHost;
                state.cartTotalPrice = res.data.cartTotalPrice;
                state.allchecked = res.data.allchecked;
                state.productionNum = 0;
                state.checked = 0;
                for (let obj of res.data.cartProductVoList) {
                    if (obj.productModelVoList) {
                        for (let item of obj.productModelVoList) {
                            state.productionNum += item.quantity;
                            if (item.checked) {
                                state.checked += item.quantity;
                            }
                        }
                    } else {
                        state.productionNum += obj.quantity;
                        if (obj.productChecked) {
                            state.checked += obj.quantity;
                        }
                    }
                }
            });
        },
        //移除商品(id 是 '161,162,122')
        removeCartProduct(state, productIdobj) {
            delCartChecked(productIdobj).then(res => {
                if (res.status == 0) {
                    state.cartList = res.data.cartProductVoList;
                    state.cartTotalPrice = res.data.cartTotalPrice;
                    state.allchecked = res.data.allchecked;
                    state.productionNum = 0;
                    state.checked = 0;
                    for (let obj of res.data.cartProductVoList) {
                        if (obj.productModelVoList) {
                            for (let item of obj.productModelVoList) {
                                state.productionNum += item.quantity;
                                if (item.checked) {
                                    state.checked += item.quantity;
                                }
                            }
                        } else {
                            state.productionNum += obj.quantity;
                            if (obj.productChecked) {
                                state.checked += obj.quantity;
                            }
                        }
                    }
                }
            });
        },
        //更新数量
        updateCartNumber(state, obj) {
            updateCartNumber(obj).then(res => {
                if (res.status == 0) {
                    state.cartList = res.data.cartProductVoList;
                    state.cartTotalPrice = res.data.cartTotalPrice;
                    state.allchecked = res.data.allchecked;
                    state.productionNum = 0;
                    state.checked = 0;
                    for (let obj of res.data.cartProductVoList) {
                        if (obj.productModelVoList) {
                            for (let item of obj.productModelVoList) {
                                state.productionNum += item.quantity;
                                if (item.checked) {
                                    state.checked += item.quantity;
                                }
                            }
                        } else {
                            state.productionNum += obj.quantity;
                            if (obj.productChecked) {
                                state.checked += obj.quantity;
                            }
                        }
                    }
                }
            });
        },
        //选中商品
        selectPro(state, product) {
            if (product.modelId) {
                selectProductWithXh(product).then(res => {
                    if (res.status == 0) {
                        state.cartList = res.data.cartProductVoList;
                        state.cartTotalPrice = res.data.cartTotalPrice;
                        state.allchecked = res.data.allchecked;
                        state.productionNum = 0;
                        state.checked = 0;
                        for (let obj of res.data.cartProductVoList) {
                            if (obj.productModelVoList) {
                                for (let item of obj.productModelVoList) {
                                    state.productionNum += item.quantity;
                                    if (item.checked) {
                                        state.checked += item.quantity;
                                    }
                                }
                            } else {
                                state.productionNum += obj.quantity;
                                if (obj.productChecked) {
                                    state.checked += obj.quantity;
                                }
                            }
                        }
                    }
                });
            } else {
                selectProduct(product).then(res => {
                    if (res.status == 0) {
                        state.cartList = res.data.cartProductVoList;
                        state.cartTotalPrice = res.data.cartTotalPrice;
                        state.allchecked = res.data.allchecked;
                        state.checked = 0;
                        state.productionNum = 0;
                        for (let obj of res.data.cartProductVoList) {
                            if (obj.productChecked) {
                                state.checked += obj.quantity;
                            }
                        }
                    }
                });
            }
        },
        //取消选中商品
        cancleselectPro(state, product) {
            if (product.modelId) {
                cancleselectProductWithXh(product).then(res => {
                    if (res.status == 0) {
                        state.cartList = res.data.cartProductVoList;
                        state.cartTotalPrice = res.data.cartTotalPrice;
                        state.allchecked = res.data.allchecked;
                        state.checked = 0;
                        state.productionNum = 0;
                        for (let obj of res.data.cartProductVoList) {
                            if (obj.productModelVoList) {
                                for (let item of obj.productModelVoList) {
                                    state.productionNum += item.quantity;
                                    if (item.checked) {
                                        state.checked += item.quantity;
                                    }
                                }
                            } else {
                                state.productionNum += obj.quantity;
                                if (obj.productChecked) {
                                    state.checked += obj.quantity;
                                }
                            }
                        }
                    }
                });
            } else {
                cancleselectProduct(product).then(res => {
                    if (res.status == 0) {
                        state.cartList = res.data.cartProductVoList;
                        state.cartTotalPrice = res.data.cartTotalPrice;
                        state.allchecked = res.data.allchecked;
                        state.productionNum = 0;
                        state.checked = 0;
                        for (let obj of res.data.cartProductVoList) {
                            if (obj.productChecked) {
                                state.checked += obj.quantity;
                            }
                        }
                    }
                });
            }
        },
        //全选商品
        selectALLPro(state) {
            selectALLProduct().then(res => {
                if (res.status == 0) {
                    state.cartList = res.data.cartProductVoList;
                    state.cartTotalPrice = res.data.cartTotalPrice;
                    state.allchecked = res.data.allchecked;
                    state.checked = 0;
                    for (let obj of res.data.cartProductVoList) {
                        if (obj.productChecked) {
                            state.checked += obj.quantity;
                        }
                    }
                }
            });
        },
        //取消全选
        cancleselectALLPro(state) {
            cancleselectALLProduct().then(res => {
                if (res.status == 0) {
                    state.cartList = res.data.cartProductVoList;
                    state.cartTotalPrice = res.data.cartTotalPrice;
                    state.allchecked = res.data.allchecked;
                    state.checked = 0;
                    for (let obj of res.data.cartProductVoList) {
                        if (obj.productChecked) {
                            state.checked += obj.quantity;
                        }
                    }
                }
            });
        },
        //搜索关键字
        savekeyword(state, keyword) {
            state.keyword = keyword;
        },
        setCatId(state, currentCatogoryId) {
            state.currentCatogoryId = currentCatogoryId;
        },
        //售后服务
        refund(state, product) {
            setStore('refundinfo', product)
            state.refundinfo = product;
        },
        //评价
        evaluation(state, product) {
            setStore('evaluationinfo', product)
            state.evaluationinfo = product;
        },
        evaluationindex(state, index) {
            setStore('evaluationinfochild', index)
            state.evaluationinfochild = index;
        },
    }
};