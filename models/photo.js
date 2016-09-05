var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RateSchema = require('./rate').schema;
var CommentSchema = require('./comment').schema;


var photoSchema = new Schema({
    title: String,
    lat: Number,
    lng: Number,
    rates: RateSchema,
    comments: CommentSchema,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createDate: {type: Date, default: Date.now}
});


photoSchema.statics.findAll = function(callback) {
    return this.find({}, callback);
};


module.exports = mongoose.model('Photo', photoSchema);
