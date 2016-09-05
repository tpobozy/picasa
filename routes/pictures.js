var express = require('express');
var router = express.Router();
var Picture = require('../models/picture');
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(req.uploadPath);
        callback(null, req.uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname.replace(/ /g,''));
    }
});
var upload = multer({ storage : storage }).array('picture');


/* GET users listing. */
router.get('/', function(req, res, next) {
    
    Picture.findAllByUser(req.user, function(err, pictures) {
        if (err) {
            console.error(err);
        }

        res.render('pictures/index', {
            title: 'My pictures',
            pictures: pictures,
            errors: req.flash('error')
        });
    });
});

router.get('/create', function(req, res, next) {

    res.render('pictures/create', {
        title: 'My pictures',
        errors: req.flash('error')
    });

});

router.post('/create', function(req, res, next) {

    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }

        console.log(req.files);
        //console.log(req);

        req.files.forEach(function(file) {
            var picture = new Picture({
                filename: file.filename,
                author: req.user.id
            });
            picture.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.end("Error saving picture.");
                }
            });
        });

        res.redirect('/pictures');
    });
});

module.exports = router;
