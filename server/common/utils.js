/**
 * Created by IvanCai on 2017/3/7.
 */
var utils = {
    generateRandomString: function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    getTimeStamp: function () {
        return Math.round(new Date().getTime() / 1000).toString();
    },
    /**
     *
     * @param status
     * @param message
     * @param data
     * @param res
     */
    jsonOutPut(status, message, data, res){
        var json = {
            status: status,
            message:message,
            data:data
        }
        res.set('Access-Control-Allow-Origin','*')
        res.set('Access-Control-Allow-Headers',"token,content-type")
        res.json(json)
    },
    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
    isEmpty(obj){
       if(typeof obj=='undefined'||obj==null||obj=='')
           return true
        return false
    }
}
module.exports = utils;