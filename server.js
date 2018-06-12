const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const apiRouter = require('./routes/people');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://gregornc:administrator1@ds231205.mlab.com:31205/friend-list', { promiseLibrary: require('bluebird') })
.then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/dist/FriendList')));
app.use('/', express.static(path.join(__dirname, '/dist/FriendList')));
app.use('/api', apiRouter);

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
  res.send(err.status);
});

const port = process.env.PORT || '8080';
app.listen(port);

console.log("App Listening on Port: " + port);
