var express = require('express');
var expressJwt = require('express-jwt');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var mongodb = require('./config/mongoose');
var config = require('./config/env/development');

var index = require('./app/routes/index');
var users = require('./app/routes/user.server.routes');
var tasks = require('./app/routes/task.server.routes');

var db = mongodb();
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	store: new RedisStore(),
	secret: config.sessionsecret,
	cookie: { maxAge: config.sessionmaxage }
}));
app.use(cors());
app.use('/', index);

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.sessionsecret }).unless({ path: ['/users/authenticate', '/users/register'] }));

app.use('/users', users);
app.use('/api', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('server err: ' + err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
