var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');


var gallerySchema = new Schema({
    name: String,
    email: String,
    isPublic: Number,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    create_date: {type: Date, default: Date.now}
});


gallerySchema.statics.findAll = function(callback) {
    return this.find({}, callback);
};


module.exports = mongoose.model('Gallery', gallerySchema);



//var User = function (data) {
//    this.data = data;
//}
//
//User.prototype.data = {}
//
//User.prototype.changeName = function (name) {
//    this.data.name = name;
//}
//
//User.findById = function (id, callback) {
//    db.get('users', {id: id}).run(function (err, data) {
//        if (err) return callback(err);
//        callback(null, new User(data));
//    });
//}

//User.prototype.save = function (callback) {
//    var self = this;
//    db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
//        if (err) return callback(err);
//        callback(null, self);
//    });
//}
//User.prototype.get = function (name) {
//    return this.data[name];
//}
//
//User.prototype.set = function (name, value) {
//    this.data[name] = value;
//}