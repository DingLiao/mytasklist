var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true
	} ,
	isDone: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('Task', schema);
