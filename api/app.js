var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userdata');
var notesRouter = require('./routes/notedata');
var mailRouter = require('./routes/mail');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var upload = require('./routes/upload');
var phoneRouter = require('./routes/phonecode');
var uploadMP3Router = require('./routes/uploadMP3.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
app.use('/userdata', usersRouter);
app.use('/upload',upload);
app.use('/notedata',notesRouter);
app.use('/mail',mailRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/phonecode',phoneRouter);
app.use('/uploadMP3',uploadMP3Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
