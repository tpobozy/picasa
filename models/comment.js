var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');


var commentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createDate: {type: Date, default: Date.now}
});


commentSchema.statics.findAll = function(callback) {
    return this.find({}, callback);
};


module.exports = mongoose.model('Comment', commentSchema);
module.exports.schema = commentSchema;