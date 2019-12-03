import axios from "axios";

export default {
    namespaced: true,
    state: {
        /*登录界面判断是否显示错误提示*/
        ifSign: false
    },
    getters: {
        getSign: state => {
            return state.ifSign;
        }
    },
    mutations: {
        setSignTrue(state) {
            state.ifSign = true;
        },
        setSignFalse(state) {
            state.ifSign = false;
        },
        setUser(state, {user_name, user_token, refresh_token}) {
            // 在这里把用户名和token保存起来
            localStorage.setItem("currentUser_name", user_name);
            localStorage.setItem("currentUser_token", user_token);
            localStorage.setItem("currentUser_refresh_token", refresh_token);
        },
        clearUser(state) {
            localStorage.removeItem("currentUser_name");
            localStorage.removeItem("currentUser_token");
            localStorage.removeItem("currentUser_refresh_token");
        }
    },
    actions: {
        userLogin(context, {user_name, user_password, router}) {
            axios({
                method: "post",
                url: "/interest/auth/oauth/token",
                params: {
                    username: user_name,
                    password: user_password,
                    grant_type: "password",
                    scope: "all"
                },
                auth: {
                    username: "client",
                    password: "secret"
                }
            })
                .then(function (response) {
                    /*console.log(response.data);*/
                    context.commit("setUser", {
                        user_name: user_name,
                        user_token: response.data.access_token,
                        refresh_token: response.data.refresh_token
                    });
                    axios.defaults.headers.common["Authorization"] =
                        "bearer " + localStorage.getItem("currentUser_token");
                    router.push({path: "/"});
                    context.commit("setSignFalse", null, {root: true});
                })
                .catch(function (error) {
                    context.commit("setSignTrue", null, {root: true});
                });
        },
        loginOUt(context, {router}) {
            router.push({path: "/"});
            location.reload();
            context.commit("clearUser");
        }
    }
};
