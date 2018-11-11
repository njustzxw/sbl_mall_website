import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Login/Register'
import Pay from '@/pages/pay'
import Payyl from '@/pages/payyl'
import License from '@/pages/icp_license'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        }, // 默认就跳转此页面
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        { // 证书
            path: '/License',
            name: 'License',
            component: License
        },
        { // 注册
            path: '/Register',
            name: 'Register',
            component: Register
        },
        { //支付宝支付
            path: '/pay/:orderNo',
            name: 'pay',
            component: Pay,
        },
        { //银联支付
            path: '/payyl/:orderNo',
            name: 'payyl',
            component: Payyl,
        },

        {
            path: '/',
            name: 'Main',
            component: Main,
            children: [{ //主页
                path: '/home',
                name: 'index',
                component: resolve => {
                    require(['@/pages/Main/index.vue'], resolve);
                }
            }, { //服务页面
                path: '/service',
                name: 'service',
                component: resolve => {
                    require(['@/pages/Main/service.vue'], resolve);
                },
            }, { //服务页面
                path: '/describe/:id',
                name: 'describe',
                component: resolve => {
                    require(['@/pages/Main/describe.vue'], resolve);
                },
            }, { //搜索页面
                path: '/search/:keyword',
                name: 'search',
                component: resolve => {
                    require(['@/pages/Main/search.vue'], resolve);
                },
            }, { //购物车页面
                path: '/cart',
                name: 'cart',
                component: resolve => {
                    require(['@/pages/Main/cart.vue'], resolve);
                },
            }, { //购物车页面
                path: '/user',
                name: 'user',
                component: resolve => {
                    require(['@/pages/Main/user.vue'], resolve);
                },
            }, { //购物车页面
                path: '/order/:opearation',
                name: 'order',
                component: resolve => {
                    require(['@/pages/Main/order.vue'], resolve);
                },
            }, { //支付页面
                path: '/payment/:orderNo',
                name: 'payment',
                component: resolve => {
                    require(['@/pages/Main/payment.vue'], resolve);
                },
            }, { //订单详情
                path: '/orderDetail/:orderNo',
                name: 'orderDetail',
                component: resolve => {
                    require(['@/pages/Main/orderDetail.vue'], resolve);
                },
            }, { //支付成功
                path: '/success',
                name: 'success',
                component: resolve => {
                    require(['@/pages/Main/success.vue'], resolve);
                },
            }, { //全部商品
                path: '/allProduct/:catid',
                name: 'allProduct',
                component: resolve => {
                    require(['@/pages/Main/allProduct.vue'], resolve);
                },
            }, { //售后服务
                path: '/refund/:orderNo',
                name: 'refund',
                component: resolve => {
                    require(['@/pages/Main/refund.vue'], resolve);
                },
            }, { //
                path: '/evaluation/:orderNo',
                name: 'evaluation',
                component: resolve => {
                    require(['@/pages/Main/comment.vue'], resolve);
                },
            }]
        },
    ]
})