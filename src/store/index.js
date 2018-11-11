import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import app from './modules/app'
import goods from './modules/goods'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false
import createLogger from 'vuex/dist/logger'; // 修改日志

export default new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        app,
        user,
        goods
    },
    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改 
})