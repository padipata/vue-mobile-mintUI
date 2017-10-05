/**
 * Created by IvanCai on 2017/4/1.
 */
var express = require('express');
var router = express.Router();
var indexService = require('../service/index')
var axios = require('axios');
var sha1 = require('sha1');
var path = require('path');
var urlencode = require('urlencode');
var mysql = require('../promise/mysql-promise')
var utils = require('../common/utils');
var config = require('../common/config');
var redirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + "&redirect_uri=" +
    urlencode(config.host + "/wxLoginCallback") + '&response_type=code&scope=snsapi_userinfo'
router.use(function (req, res, next) {
    var cookies = req.cookies,token=cookies.ys_token;
    var rawPath = req.path.replace('/', '')
    if(!utils.isEmpty(req.query.versusId))
        rawPath=rawPath+'Fenge'+req.query.versusId
    if (typeof token == 'undefined') {
        if (req.path != '/wxlogin' && req.path != '/wxLoginCallback' && req.path.indexOf('/dist') == -1 &&req.path.indexOf('/api') == -1&&req.path.indexOf('/getWxSignInfo') == -1 )
            res.redirect('/wxlogin?rawPath=' + rawPath)
        next();
    }
    else{
        var updateTime = '';
        mysql.query("select user_id,update_time from ys_token where token=?", [token])
            .then(function (obj) {
                var results = obj.results;
                if (results.length == 0)
                    return ''
                else{
                    updateTime=results[0].update_time
                    return results[0].user_id
                }
            }).then(function (userId) {
            var currentTime=Math.round(new Date().getTime()/1000),week=14*24*3600
            if (userId == '') {
                if (req.path != '/wxlogin' && req.path != '/wxLoginCallback' && req.path.indexOf('/dist') == -1 && req.path != '/wifiConfig'&&req.path.indexOf('/api') == -1&&req.path.indexOf('/getWxSignInfo') == -1 )
                    res.redirect('/wxlogin?rawPath=' + rawPath)
                next();
            }
            else if((currentTime-updateTime)>week){
                if (req.path != '/wxlogin' && req.path != '/wxLoginCallback' && req.path.indexOf('/dist') == -1 && req.path != '/wifiConfig'&&req.path.indexOf('/api') == -1&&req.path.indexOf('/getWxSignInfo') == -1 )
                    res.redirect('/wxlogin?rawPath=' + rawPath)
                next();
            }
            else {
                next();
            }
        }).catch(function (error) {
            console.log(error.message)
            next()
        })
    }
})
router.get('/index', function (req, res) {
    // res.cookie('ys_token', 'a428d8b2eafc68110edd68406d368501')
    res.sendFile(path.resolve(__dirname, '../../index.html'));
})
router.get('/sharePage',function (req,res) {
    var versusId=req.query.versusId
    res.cookie('versusId', versusId, {expires: new Date(Date.now() + 3600 * 24 * 14 * 1000)})
    res.sendFile(path.resolve(__dirname, '../../share.html'));
})
router.get('/wxlogin', function (req, res) {
    var state = req.query.rawPath;
    var fRedirectUrl = redirectUrl + "&state=" + state+"#wechat_redirect";
    res.redirect(fRedirectUrl);
    console.log(fRedirectUrl);
})
router.post('/getWxSignInfo', function (req, res) {
    axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.appid + '&secret=' + config.appSecret)
        .then(function (response) {
            if (response.status == 200) {
                return axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + response.data.access_token + '&type=jsapi');
            }
            else
                res.send('error');
        })
        .then(function (response) {
            if (response.status == 200) {
                var ticket = response.data.ticket,
                    nonceStr = utils.generateRandomString(16),
                    timeStamp = utils.getTimeStamp(),
                    url = req.body.url;
                var string1 = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timeStamp + '&url=' + url;
                console.log('string1:' + string1);
                var signature = sha1(string1);
                console.log('sign:' + signature);
                var json = {
                    status: 200,
                    data: {
                        appId: config.appid,
                        jsTicket: ticket,
                        url: url,
                        timeStamp: timeStamp,
                        nonceStr: nonceStr,
                        sign: signature
                    }
                }
                res.json(json);
            }
        })
        .catch(function (err) {
            console.log(error);
            var json = {
                status: 400,
                message: {error}
            }
            res.send('error');
        })
})
router.get('/wxLoginCallback', function (req, res) {
    var code = req.query.code;
    console.log('code=' + code);
    axios.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appid + '&secret=' + config.appSecret + '&code=' + code +
        '&grant_type=authorization_code'
    )
        .then(function (response) {
            if (response.status == 200) {
                var access_token = response.data.access_token;
                return axios.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token +
                    '&openid=OPENID&lang=zh_CN'
                )
            }
        })
        .then(function (response) {
            if (response.status == 200) {
                var data = response.data;
                console.log(data)
                indexService.handleWxloginCallback(req, res, data)
            }
        })
        .catch(function (err) {
            res.send('error');
        })
})

module.exports = router