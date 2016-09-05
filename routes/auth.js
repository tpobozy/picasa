var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy= require('passport-remember-me').Strategy;
var User = require('../models/user');
var utils = require('../utils');


require('../config/passport')(passport);

//
//passport.use('local', new LocalStrategy({
//        usernameField: 'email',
//        passwordField: 'password'
//    },
//    function (username, password, done) {
//        User.findOne({email: username}, function (err, user) {
//            if (err) {
//                return done(err);
//            }
//            if ( ! user) {
//                return done(null, false, {message: 'Incorrect username.'});
//            }
//            if ( ! user.validPassword(password)) {
//                return done(null, false, {message: 'Incorrect password.'});
//            }
//            return done(null, user);
//        });
//    }
//));

//passport.use(new RememberMeStrategy(
//    function (token, done) {
//        console.log('using rember-me');
////        LoginToken.consume(token, function (err, user) {
////            if (err) {
////                return done(err);
////            }
////            if (!user) {
////                return done(null, false);
////            }
////            return done(null, user);
////        });
//    },
//    function (user, done) {
//        var token = utils.generateToken(64);
//        console.log('using remeber-me, token=' + token);
////        Token.save(token, {userId: user.id}, function (err) {
////            if (err) {
////                return done(err);
////            }
////            return done(null, token);
////        });
//    }
//));


//passport.serializeUser(function(user, done) {
//    done(null, user._id);
//});
//
//passport.deserializeUser(function(id, done) {
//    User.findById(id, function(err, user) {
//        done(err, user);
//    });
//});


var validateLogin = function(req, res, next) {

    User.findOne({email: req.body.email}, function (err, user) {
            if ( ! user) {
                return res.render('auth/login', {
                    title: 'Login Page',
                    post: {
                        email: req.body.email
                    },
                    errors: 'User not found!'
                });
            }
            if ( ! user.validPassword(req.body.password)) {
                return res.render('auth/login', {
                    title: 'Login Page',
                    post: {
                        email: req.body.email
                    },
                    errors: 'Incorrect password!'
                });
            }
            if ( ! user.isActive) {
                return res.render('auth/login', {
                    title: 'Login Page',
                    post: {
                        email: req.body.email
                    },
                    errors: 'Account is not active!'
                });
            }

            next();
        });
};

var validateSignup = function(req, res, next) {

    User.findOne({email: req.body.email}, function (err, user) {
            if (user) {
                return res.render('auth/signup', {
                    title: 'Signup Page',
                    post: {
                        email: req.body.email
                    },
                    errors: 'Account already exists!'
                });
            }
            if (req.body.password.length < 5) {
                return res.render('auth/signup', {
                    title: 'Signup Page',
                    post: {
                        email: req.body.email
                    },
                    errors: 'Password is too weak!'
                });
            }

            next();
        });
};


router.get('/login', function (req, res, next) {
    // if authenticated
    // redirect to home page
    // otherwise display login form


    res.render('auth/login', {
        title: 'Login Page',
        errors: req.flash('error')
    });
});

router.post('/login',
    validateLogin,
    passport.authenticate('local-login', {
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
//    function(req, res, next) {
//        // issue a remember me cookie if the option was checked
//        if (!req.body.remember_me) { return next(); }

//        var token = utils.generateToken(64);
//        Token.save(token, { userId: req.user.id }, function(err) {
//            if (err) { return done(err); }
//            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
//            return next();
//        });
//    },
    function(req, res) {
        res.redirect('/'); // on success
    }
);


router.get('/signup', function (req, res, next) {
    res.render('auth/signup', {
        title: 'Signup Page',
        errors: req.flash('error')
    });
});

// TEMP
router.get('/create', function (req, res, next) {
    var newUser = new User(
            {
                name: 'tomasz',
                email: 'tomaszpobozy@gmail.com',
            }
    );

    newUser.password = newUser.generateHash('111');
    
    newUser.save(function (err) {
        if (err) return handleError(err);
        console.log('new user created!!');
        res.send('ok');
    });

});
// end

router.post('/signup', 
    validateSignup,
    passport.authenticate('local-signup', {
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
//    function(req, res, next) {
//        // issue a remember me cookie if the option was checked
//        if (!req.body.remember_me) { return next(); }

//        var token = utils.generateToken(64);
//        Token.save(token, { userId: req.user.id }, function(err) {
//            if (err) { return done(err); }
//            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
//            return next();
//        });
//    },
    function(req, res) {
        res.redirect('/'); // on success
    }
);

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
