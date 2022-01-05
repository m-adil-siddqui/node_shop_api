// var createError = require('http-errors');

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from "body-parser";
import indexRouter from 'routes/index';
import authRouter from "routes/auth/auth_routes";
import catRouter from "routes/category_routes";
import productRouter from "routes/product_routes";
import cors from "cors";


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/category', catRouter);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error')
  return res.status(err.status || 500).json({"status": 500, "error":err.message})
});

export default app;


// app.use(session({
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   secret: 'shhhh, very secret'
// }));