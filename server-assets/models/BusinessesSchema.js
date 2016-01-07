var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
    BusinessName: String,
    Brandname: String,
    ProductLine: String,
    BusinessOrgID: [{
        type: Mongoose.Schema.ObjectId,
        ref: 'BusinessOrganizations'
    }],
    BusinessOwnerIDs: [{
        type: Mongoose.Schema.ObjectId,
        ref: 'BusinessOwners'
    }],
    Products: [{
        type: Mongoose.Schema.ObjectId,
        ref: 'Products'
    }],
    Competition: [{
        type: Mongoose.Schema.ObjectId,
        ref: 'Competition'
    }],
    Watchlist: [{
        type: Mongoose.Schema.ObjectId,
        ref: 'Watchlist'
    }],
    DataShare: {
        type: String,
        default: 'Y'
    },
    Active: {
        type: String,
        default: 'A'
    }
});

module.exports = Mongoose.model('Businesses', schema);