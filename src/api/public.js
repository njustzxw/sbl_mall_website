// var host = "http://b2b.99sbl.com/";
// var host = "http://localhost:8080/";
import axios from "axios";
import {
    host
} from "./config";
var qs = require("qs");
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded '
axios.interceptors.response.use(
    response => {
        if (response.data.status == 10) {
            var htm = `<div class="alertinfobox clearfix">
                            <img src="../../static/images/gantan.png" class="fl">
                            <span class="alertinfo fl" style="width:200px;">
                                游客，请先登录！ <br/>
                            </span>
                        </div>`
            ti_xing(htm)
            setTimeout(function() {
                $("#ti_xing").modal('hide')
                window.open("#/Login", "_self")
            }, 2000)
        } else {
            return response;
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    //这里跳转登陆
            }
        }
    }
);
export default {
    fetchGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(host + url, {
                    params: params
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    //其他链接的请求
    fetchOtherGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get('http://express.99sbl.com/' + url, {
                    params: params
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    fetchPost(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(host + url, qs.stringify(params), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};