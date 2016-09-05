var express = require('express');
var router = express.Router();
var Picture = require('../models/picture');


router.get('/:pictureId', function(req, res, next) {
    var pictureId = req.params.pictureId;

    var picture = Picture.findById(pictureId);

    req.render('picture/view', {
        title: 'Picture',
        picture: picture
    });
});

router.get('/:pictureId/edit', function(req, res, next) {
    var pictureId = req.params.pictureId;
    var picture = Picture.findById(pictureId);

    if (req.user.id !== picture.author.id) {
        res.redirect('/')
    }

    req.render('picture/edit', {
        title: 'Picture',
        picture: picture
    });
});


module.exports = router;
