require('./models/db-connection.js');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homepageRouter = require('./routes/homepage');
var paiementRouter = require('./routes/paiement');

var app = express();


app.locals.formatDate = (date) => {
  return date.toLocaleDateString('fr-FR')
}

app.locals.dateFormat = function (elemDate) {
  var date = new Date(elemDate);
  var dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (date.getDate() + '/' + dates[date.getMonth()] + '/' + date.getFullYear());
}

const Stripe = require('stripe');
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(
  session({
    secret: 'a4f8071f-c873-4447-8ee2',
    resave: false,
    saveUninitialized: false,
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homepage', homepageRouter);
app.use('/paiement', paiementRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
