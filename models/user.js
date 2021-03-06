var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now}
});


userSchema.statics.findAll = function (callback) {
    return this.find({}, callback);
};


userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);



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