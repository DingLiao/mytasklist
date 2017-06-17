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
var apiRouters = require('./app/routes/index');

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
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(session({
	store: new RedisStore(),
	secret: config.sessionsecret,
	cookie: { maxAge: config.sessionmaxage }
}));
app.use(cors());
app.use('/', index);

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.sessionsecret }).unless({ path: ['/api/users/authenticate', '/api/users/register', new RegExp('/static/tasklist.*/', 'i')] }));
app.use('/api', apiRouters);

app.all("/static/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/../client/dist" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('server err: ' + err.message);
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
