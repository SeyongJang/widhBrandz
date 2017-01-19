var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.rootDir = __dirname;
// var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./myModules/config.js');
mongoose.connect(config.dbUrl());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" we're connected! ");
});

// global.jQuery = require('jquery');
// var bootstrap = require('bootstrap');


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
// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, '/node_modules/bootstrap/scss'),
//   dest: path.join(__dirname, '/node_modules/bootstrap/dist/css'),
//   indentedSyntax: false,
//   sourceMap: true,
//   debug:true,
//   outputStyle:'compressed'
// }));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/chart.js/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/node_modules/tether/dist/css'));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

