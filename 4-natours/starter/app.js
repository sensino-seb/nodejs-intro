const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) MIDDLEWARE (for all routes)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES (middleware for specific routes)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ROUTE handler for all routes which are not catched in tourRouter or userRouter
app.all('*', (req, res, next) => {
  // const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';

  // if err is passed to next, express goes directly to the error handler middleware
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// express automatically knows that this is error handling middleware
app.use(errorController);

module.exports = app;
