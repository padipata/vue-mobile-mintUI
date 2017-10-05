var express = require('express');
var path = require('path');
var app = express();
var indexRouter=require('./routers/index')
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')
var apiRouter=require('./routers/api')
app.use('/dist', express.static(path.resolve(__dirname,'../dist')));
// app.get('/',function (req,res) {
//     res.sendFile(path.resolve(__dirname, '../index.html'));
// });
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/',indexRouter)
app.use('/api',apiRouter)
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)
});
module.exports = app;
