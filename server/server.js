const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

require('./api/models/db');
require('./api/models/product-model');
require('./api/models/testimonies-model');
require('./api/models/main-carousel-model');
require('./api/models/users');
require('./api/config/passport');
require('dotenv').config();

const routesApi = require('./api/routes/index');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use("/api", routesApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Catch unauthorised errors
app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ message: `${err.name}: ${err.message}` });
    }
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(4000, function() {
    console.log("Server is running on Port: 4000");
});

module.exports = app;
