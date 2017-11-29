/**
 * Created by IvanCai on 2017/4/1.
 */
var mysql = require('mysql2');
var mysqlConf = require('../common/mysql-config');


module.exports = {
    query(sql, params){
        var connection = mysql.createConnection(mysqlConf)
        return new Promise(function (fulfill, reject) {
            connection.connect(function (err) {
                if (err)
                    reject(err)
                else {
                    // console.log('connect success')
                    connection.execute(sql, params, function (err, results, fields) {
                        if (err)
                            reject(err)
                        else
                            fulfill({results, fields})
                    })
                    connection.end()
                }
            })
        })
    },
}
