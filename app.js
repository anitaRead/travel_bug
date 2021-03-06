var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// var { getCode, getName } = require('country-list');



var homeRouter = require('./routes/home');
var sessionsRouter = require('./routes/sessions');
var signUpRouter = require('./routes/signUp');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({key: 'user_sid', secret: 'somerandonstuffs', resave: false, saveUninitialized: false,
  cookie: {expires: 600000}
}));

var sessionChecker = (req, res, next) => {
  if (req.session.user_sid)
  {
    next();
  } else {
    res.redirect('/');
  }};

  app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  }));

  app.use((req, res, next) => {
    if (!req.cookies.user_sid) {
      res.clearCookie('user_sid');
    }
  next();
});

// route setup
app.use('/sessions', sessionsRouter);
app.use('/signup', signUpRouter)
app.use('/profile', sessionChecker, profileRouter)
app.use('/', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
