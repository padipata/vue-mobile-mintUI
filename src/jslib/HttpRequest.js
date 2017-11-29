/**
 *
 */
import axios from 'axios'
import utils from '../jslib/utils'

export default axios.create({
    baseURL: 'http://localhost/',
    timeout: 20000,
    headers: {'token': utils.getToken()},
})