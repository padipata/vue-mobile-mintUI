/**
 * Created by IvanCai on 2017/5/16.
 */

import HttpRequest from '../jslib/HttpRequest'

// this is example,using get request
const getList = (param1) => {
    return HttpRequest({url: '/api/getUserInfo?param1=' + param1})
}

// this is example2,using post request with json params
const updateUserInfo = (jsonParam) => {
    return HttpRequest({url: '/api/getUserInfo', method: 'post', data: jsonParam})
}

// this is example3,using post request with x-www-form-urlencoded
const getUserInfo = (name,age) => {
    return HttpRequest({
        url: '/api/getUserInfo',
        method: 'post',
        data: "name="+name+"&age="+age
    })
}

export {getUserInfo}