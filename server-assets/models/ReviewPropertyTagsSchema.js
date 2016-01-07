var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	BusinessID: [{ type : Mongoose.Schema.ObjectId, ref : 'Businesses' }],
	ReviewPropertyID: [{ type : Mongoose.Schema.ObjectId, ref : 'ReviewProperties' }],
	ReviewPropertyTag: String,	
	ReviewPropertyTagDesc: String,	
	Tonetype: {
        type: [{
            type: String,
            enum: ['P', 'N']
        }],
        default: ['P']
    },
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('ReviewPropertyTags', schema);