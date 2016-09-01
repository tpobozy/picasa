var express = require('express');
var router = express.Router();
var User = require('../models/user');



router.get('/', function(req, res, next) {
    res.render('account/info', {
        title: 'Account',
        user: req.user
    });
});

router.post('/', function(req, res, next) {
    var User = req.user;

    User.update({
        name: req.body.name
    }, function (err, raw) {
        if (err) return handleError(err);
    });

    res.redirect('account');
});

module.exports = router;
