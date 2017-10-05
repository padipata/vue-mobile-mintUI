module.exports = {
    host: "http://mobile.yueso.top/",
    getToken(){
        return this.getCookie('ys_token')
    },
    timeStamp2Date(timestamp){
        var date = new Date(timestamp);
        console.log(timestamp)
        var month = date.getMonth(),
            day = date.getDay();
        return month + '-' + day
    },

    subDateString(date){
        return new String(date).substring(5, 10)
    },
    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
    setCookie(name, value){
        var Days = 14;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name){
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
}