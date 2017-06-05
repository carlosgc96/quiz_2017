var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var partials = require('express-partials');
var flash = require('express-flash');
var methodOverride = require('method-override');
var sequalize = require('sequelize');
var index = require('./routes/index');

var app = express();
//BBDD
var DATABASE_URL = "postgres://ipurrukilwtxxb:bda2214473db05668dd99d8787ff9e373206d164a2bf2ca0daf76927b7fdade6@ec2-107-21-99-176.compute-1.amazonaws.com:5432/dbbqjv39b6kv6c";
var url, storage;
if(!proccess.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";

}

var sequelize = new Sequelize(url, {storage:storage});

var Quiz = sequelize.import(path.join(__dirname, 'quiz');

sequelize.sync();
.then(function() {
	console.log('BBDD creada con exito');
})
.catch(function(error){

	console.log('error al crear BBDD' + error);
process.exit(1);

});

exports.Quiz = Quiz;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "Quiz 2017",
    resave: false,
    saveUninitialized: true}));
app.use(methodOverride('_method', {methods: ["POST", "GET"]}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());
app.use(flash());

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
