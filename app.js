var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var shoplistRouter = require('./routes/shoplist');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var userlistRouter = require('./routes/userlist');

var { version } = require('./config')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//body-parser 护理form-data数据 和request payload 数据
//express4.x集成了body-paser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());//解析cookie
//处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

//启用路由工具
app.use('/', indexRouter);

app.use('/api/'+ version+'/shoplist', shoplistRouter);
app.use('/api/'+ version+'/admin', adminRouter);
app.use('/api/'+ version+'/user', userRouter);
app.use('/api/'+ version+'/userlist', userlistRouter);




//处理404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));//引入了模块
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
