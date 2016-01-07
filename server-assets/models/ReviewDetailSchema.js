var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
	ReviewID: String,
	BusinessID: [{ type : Mongoose.Schema.ObjectId, ref : 'Businesses' }],
	ASIN: String,
	Locale: String,
	SrNo: Number,
	ReviewPageNumber: Number,
	ReviewStatus: {
        type: [{
            type: String,
            enum: ['B', 'N', 'U', 'D']
        }],
        default: ['B']
    },
	ReviewCaptureDateTime: { type : Date, default : Date.now },
	ReviewDescription: String,
	ReviewRating: Number,
	ReviewTitle: String,
	ReviewDate: Date,
	ReviewerPseudoName: String,
	ReviewerRealName: String,
	ReviewerLocation: String,
	ReviewNumberOfComments: Number,
	ReviewNumberOfImages: Number,
	ReviewNumberOfVideos: Number,
	ReviewFoundUsefulBy: Number,
	ReviewFoundUsefulOutOf: Number,
	PurchaseVerifiedByAmazon: String,
	ReviewVerifiedByAmazon: String,
	ReviewerBadge: String,
	ReviewURL: String,
	ReviewerURL: String,
	ReviewPropertyID: [{ type : Mongoose.Schema.ObjectId, ref : 'ReviewProperties' }],
	ReviewPropertyTagID: [{ type : Mongoose.Schema.ObjectId, ref : 'ReviewPropertyTags' }],
	ReviewerWishListURL: String,
	ReviewerWishListOwnerName: String,
	ReviewerPersonalEmail: String,
	ReviewerWebsite: String,
    Active: { type : String, default : 'A'}
});

module.exports = Mongoose.model('ReviewDetail', schema);