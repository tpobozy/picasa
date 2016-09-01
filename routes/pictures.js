var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, req.rootPath + '/public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname.replace(/ /g,''));
    }
});
var upload = multer({ storage : storage }).array('picture');


/* GET users listing. */
router.get('/', function(req, res, next) {
    /* TODO get user photos
    Photo.findAllByUser(user, function(err, users) {
        res.send(photos);
    });
    */
    

    res.render('pictures/index', {
        title: 'My photos',
        errors: req.flash('error')
    });
});

router.get('/create', function(req, res, next) {

    res.render('pictures/create', {
        title: 'My pictures',
        errors: req.flash('error')
    });

});

router.post('/create', function(req, res, next) {

    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        
        res.redirect('/pictures');
    });



//    var name = req.params.name;
//
//    var User = mongoose.model('User', { name: String });
//
//    var kitty = new User({ name: name });
//    kitty.save(function (err) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('new user created');
//        }
//    });
//
//    res.redirect('/users');
});

module.exports = router;
