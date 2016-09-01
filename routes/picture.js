var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


/* GET users listing. */
router.get('/:pictureId', function(req, res, next) {
    //res.send('respond with a resource');
    var pictureId = req.params.pictureId;

    var picture = Picture.findById(pictureId);

    req.render('picture/view', {
        title: 'Picture',
        picture: picture
    });
});


module.exports = router;
