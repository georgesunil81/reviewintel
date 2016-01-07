var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	BusinessOrgName: String,
	Brandname: String,
	MentorIDs: [{ type : Mongoose.Schema.ObjectId, ref : 'Mentors' }],
	BusinessOrgOwnerIDs: [{ type : Mongoose.Schema.ObjectId, ref : 'BusinessOwners' }],
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('BusinessOrganizations', schema);