var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	BusinessID: [{ type : Mongoose.Schema.ObjectId, ref : 'Businesses' }],
	ReviewProperty: String,
	ReviewPropertyDesc: String,	
	Tonetype: {
        type: [{
            type: String,
            enum: ['P', 'N']
        }],
        default: ['P']
    },
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('ReviewProperties', schema);