import { setStore, getStore, removeStore } from '@/utils/storage'
export default {
    state: {
        userInfo: getStore('userInfo'),//是否登陆
        
    },
    getters: {
        // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
    },
    mutations: {
        saveuserInfo(state,userInfo){
            state.userInfo = userInfo
            setStore('userInfo', userInfo)
        }
    }
}