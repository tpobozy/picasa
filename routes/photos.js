var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    

    User.findAll(function(err, users) {
        res.send(users);
    });
});

router.get('/create', function(req, res, next) {
    // TODO
    // https://codeforgeek.com/2014/11/file-uploads-using-node-js/
    // https://github.com/expressjs/multer
    
    var name = req.params.name;

    var User = mongoose.model('User', { name: String });

    var kitty = new User({ name: name });
    kitty.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new user created');
        }
    });

    res.redirect('/users');
});

module.exports = router;
