var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	ASIN: String,
	BusinessID: { type : Mongoose.Schema.ObjectId, ref : 'User' },      //References User for one-to-one relationship between a business owner and his/her product. Needs to be BusinessID: [{ type : Mongoose.Schema.ObjectId, ref : 'Businesses' }] as per our final application data model
	Locale: String,
	Category: String,
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('Products', schema);