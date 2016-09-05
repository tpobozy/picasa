var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');


var rateSchema = new Schema({
    rate: Number,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createDate: {type: Date, default: Date.now}
});


rateSchema.statics.findAll = function(callback) {
    return this.find({}, callback);
};


module.exports = mongoose.model('Rate', rateSchema);
module.exports.schema = rateSchema;