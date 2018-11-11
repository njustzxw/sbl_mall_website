// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'babel-polyfill'


Vue.config.productionTip = false
Vue.use(iView);
new Vue({
        el: '#app',
        router,
        store,
        components: {
            App
        },
        template: '<App/>',
    })
    //路由跳转后，返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})