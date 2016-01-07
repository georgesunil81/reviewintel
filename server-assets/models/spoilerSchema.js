var mongoose = require('mongoose');
var q = require('q');

var schema = new mongoose.Schema({
	movie: {},
	text: String,
	user: {
		type: String,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Spoiler', schema);