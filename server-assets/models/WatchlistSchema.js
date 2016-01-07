var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	ASIN: String,
	BusinessID: [{ type : Mongoose.Schema.ObjectId, ref : 'Businesses' }],
	Locale: String,
	Category: String,
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('Watchlist', schema);