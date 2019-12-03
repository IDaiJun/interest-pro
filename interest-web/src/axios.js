import axios from "axios";
import store from "./store/store";
import router from "./router";
import appUtils from "./utils/appUtils.js";

// axios 配置
const auth = appUtils.appUserAuthorization();
console.info("[login authorization] ==>"+auth);
axios.defaults.timeout = 10000;
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = auth;

// http request 拦截器
/*axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });*/

// http response 拦截器
axios.interceptors.response.use(
    response => {
        switch (response.data.status) {
            case "4001":
                store.commit("users/clearUser");
                //location.reload();
                setTimeout("location.reload()", 100);
                router.replace({
                    path: "/",
                });
                break;
            case "4003":
                router.replace({
                    path: "/",
                });
                break;
        }
        return response;
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端状态异常';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        }
        console.error(JSON.stringify(error));
        return Promise.reject(error);
    }
);

export default axios;
