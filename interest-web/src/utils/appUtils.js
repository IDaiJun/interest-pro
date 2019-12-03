export default {
    lsGetItem:function(key){
        let item = localStorage.getItem(key);
        return item == null ? "" : item;
    },
    appUserName:function(){
        return this.lsGetItem("currentUser_name");
    },
    appUserToken:function(){
        return this.lsGetItem("currentUser_token");
    },
    appUserRefreshToken:function(){
        return this.lsGetItem("currentUser_refresh_token");
    },
    appUserIslogin:function(){
        return this.appUserToken() != "" ? true : false;
    },
    appUserAuthorization:function(){
        return this.appUserIslogin() ? "bearer " + this.appUserToken() : "";
    }
}