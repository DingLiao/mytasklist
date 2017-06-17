var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.server.model');

var schema = new Schema({
	title: {
		type: String,
		required: true
	} ,
	isDone: {
		type: Boolean,
		required: true
	} ,
	creator_id: {
		type: Schema.ObjectId, 
		ref: 'User'
	}
});

schema.statics.findByCreatorId = function(creatorId, callback) {
	console.log("schema.statics.findByCreatorId: " + creatorId);
	return this.find({ "creator_id": creatorId}).exec(callback);
}

module.exports = mongoose.model('Task', schema);