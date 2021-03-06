var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var q = require('q');

var schema = new mongoose.Schema({
	username: String,
	password: String,
	MentorName: String,
	roles: {
        type: [{
            type: String,
            enum: ['Admin', 'MentorOrgOwner', 'Mentor']
        }],
        default: ['Mentor']
    },
    Active: String,
    RegistrationCode: String,
    DefaultView: {
        type: [{
            type: String,
            enum: ['Admin', 'MentorOrgOwner', 'Mentor']
        }],
        default: ['Mentor']
    }
});


schema.methods.verifyPassword = function(givenPassword) {
	var dfd = q.defer();
	bcrypt.compare(givenPassword, this.password, function(err, result) {
		if (result) {
			dfd.resolve(true);
		}
		else {
			dfd.reject(false);
		}
	});
	return dfd.promise;
};

schema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(12, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		})
	});
});

module.exports = mongoose.model('Mentors', schema);