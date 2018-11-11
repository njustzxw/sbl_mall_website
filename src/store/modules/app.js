import {
    setStore,
    getStore,
} from "@/utils/storage";
export default {
    state: {
        servicename: getStore("servicename"),
        treedata: getStore("treedata"),
    },
    getters: {},
    mutations: {
        servicename(state, name) {
            state.servicename = name;
            setStore("servicename", name);
        },
        classifyTree(state, treedata) {
            state.treedata = JSON.stringify(treedata);
            setStore("treedata", JSON.stringify(treedata));
        },
    }
};