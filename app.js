var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
//var hbs = require('hbs');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');

var app = express();
var db = mongoose.connection;


mongoose.connect('mongodb://localhost/picasa');

db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
    console.log('mongodb connection is open now');
});


app.engine('.hbs', exphbs({
    defaultLayout: 'base',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


var day = new Date( Date.now() + 24 * 3600 * 1000 ); // 1 day
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'polcode-picasa-tmp', cookie:{maxAge: day} }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));



// controllers https://gist.github.com/fwielstra/1025038
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.authenticated = req.isAuthenticated();
    next();
});

app.use(function (req, res, next) {
    req.rootPath = __dirname;
    next();
});


app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/account', isAuthenticated, require('./routes/account'));
//app.use('/users', isAuthenticated, require('./routes/users'));
app.use('/users', require('./routes/users'));
//
app.use('/galleries', isAuthenticated, require('./routes/galleries'));
app.use('/gallery', isAuthenticated, require('./routes/gallery'));
//app.use('/pictures', isAuthenticated, require('./routes/pictures'));
app.use('/pictures', require('./routes/pictures'));
app.use('/picture', isAuthenticated, require('./routes/picture'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
