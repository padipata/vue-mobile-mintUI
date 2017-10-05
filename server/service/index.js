/**
 * Created by IvanCai on 2017/4/1.
 */
var mysql = require('../promise/mysql-promise')
var axios = require('axios');
var path = require('path')
module.exports = {
    handleWxloginCallback(req, res, data){
        var state = req.query.state;
        state=state.split('Fenge')
        axios.post('http://yueso.dankal.cn/index.php/api/User/login', {user: data})
            .then(function (response) {
                console.log(response.data)
                if (response.data.code == 200) {
                    var token = response.data.data.token.token;
                    res.cookie('ys_token', token, {expires: new Date(Date.now() + 3600 * 24 * 14 * 1000)})
                    if (state[0] == 'user') {
                        res.redirect('http://mobile.yueso.top:88/user')
                    }
                    else  if(state[0]=='yuesowang'){
                        res.redirect('http://mobile.yueso.top:88')
                    }
                    else if(state[0]=='sharePage'){
                        var versusId=state[1]
                        res.redirect("/sharePage?versusId="+versusId)
                    }
                    else {
                        res.redirect('/index')
                    }
                }
            }).catch(function (err) {
            console.log(err.message)
            res.send('授权失败')
        })
    }
}