var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RateSchema = require('./rate').schema;
var CommentSchema = require('./comment').schema;
var appConfig = require('../config/app');


var pictureSchema = new Schema({
    filename: String,
    title: String,
    lat: Number,
    lng: Number,
    rates: RateSchema,
    comments: CommentSchema,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createDate: {type: Date, default: Date.now}
});


pictureSchema.statics.findAll = function(callback) {
    return this.find({}, callback);
};
pictureSchema.statics.findAllByUser = function(user, callback) {
    return this.find({author: user.id}, callback);
};


pictureSchema.methods.filepath = function() {
    return '/' + appConfig.upload_dir + this.filename;
};


module.exports = mongoose.model('Picture', pictureSchema);
