var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	username: { type: String, default: '' },
	password: { type: String, default: '' }
});

module.exports = mongoose.model('User', schema);