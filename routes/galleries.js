var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gallery = require('../models/gallery');


router.get('/', function(req, res, next) {
    Gallery.findAll(function(err, galleries) {
        res.send(galleries);
    });
});

var validateGallery = function(req, res, next) {
    // TODO
    next();
};

router.get('/create', validateGallery, function(req, res, next) {
    var name = req.params.name;

    var newGallery = new Gallery({ name: name });
    newGallery.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new user created');
        }
    });

    res.redirect('/galleries');
});

module.exports = router;
