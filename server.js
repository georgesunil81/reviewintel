var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var port = 9091;

var mongoose = require('mongoose');

var secrets = require('./secrets.js');

//mongoose.connect('mongodb://localhost/ReviewINTEL_1');
// Here we find an appropriate database to connect to, defaulting to localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/ReviewINTEL_1';
mongoose.connect(uristring);

var User = require('./server-assets/models/userSchema');
var Spoiler = require('./server-assets/models/spoilerSchema');
var Businesses = require('./server-assets/models/BusinessesSchema');
var BusinessOrganizations = require('./server-assets/models/BusinessOrganizationsSchema');
var BusinessOwners = require('./server-assets/models/BusinessOwnersSchema');
var Competition = require('./server-assets/models/CompetitionSchema');
var Mentors = require('./server-assets/models/MentorsSchema');
var Products = require('./server-assets/models/ProductsSchema');
var ReviewDetail = require('./server-assets/models/ReviewDetailSchema');
var ReviewProperties = require('./server-assets/models/ReviewPropertiesSchema');
var ReviewPropertyTags = require('./server-assets/models/ReviewPropertyTagsSchema');
var Watchlist = require('./server-assets/models/WatchlistSchema');


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            user.verifyPassword(password).then(function(result) {
                if (!result) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


var app = express();
app.use(cors()); 
app.use(bodyParser.json());

//Need to externalize the session secret key below into a separate file and add that to .gitignore
app.use(session({
    secret: secrets.secret,
    resave: false, // deprecated to leave undefined 
    saveUninitialized: false
}));

app.use(express.static(__dirname + '/public')); 
app.use(passport.initialize());
app.use(passport.session());

var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    next();
};

var requireRole = function(user, role) {
    if (user.roles.indexOf(role) > -1) {
        return true;
    }
    return false;
};

var requireAdmin = function(req, res, next) {
    if (!requireRole(req.user, 'admin')) {
        return res.status(403).end();
    }
    next();
}

var requireModerator = function(req, res, next) {
    if (!requireRole(req.user, 'moderator')) {
        return res.status(403).end();
    }
    next();
}

app.get('/api/users/currentUser', requireAuth, function(req, res) {
    return res.json(req.user);
});


//user registration
app.post('/api/userRegistration', function(req, res) {
    
    User.findOne({
        username: req.body.username
    }).exec().then(function(user) {
        if (user) {
            return res.status(409).end();
        }
        
        user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.save().then(function() {
            return res.status(201).end();
        });
    });
});

//demo user registration
app.post('/api/demoUserRegistration', function(req, res) {

    //console.log("Demo user registration...");
    
    User.findOne({
        username: req.body.username
    }).exec().then(function(user) {
        if (user) {
            return res.status(409).end();
        }
        
        user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.save(function(err, userObj) {
            //console.log("The demo user db id is ", userObj._id);



var newUserWithProduct = new Products();
    newUserWithProduct.ASIN = "B003GEKXRM"; //B00J22TM7Y";//"B00NWXBYHU";  //assign demo ASIN to the demo user
    newUserWithProduct.BusinessID = mongoose.Types.ObjectId(userObj._id);
    newUserWithProduct.Locale = "www.amazon.com";
    newUserWithProduct.Category = "ASIN Category 1";

    newUserWithProduct.save(function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            //res.json(result);
            //console.log("ASIN successfully allocated to demo user...");
            return res.status(201).end();
        }
    });






            //return res.status(201).end();
        });
    });
});


//login
app.post('/api/auth/local', passport.authenticate('local'), function(req, res) {
    return res.status(200).end();
});

app.get('/api/auth/logout', function(req, res) {
    req.logout();
    return res.status(200).end();
});

app.get('/api/own-product-asins/:userID', requireAuth, function(req, res) { 
    Products.find({
        'BusinessID': mongoose.Types.ObjectId(req.params.userID)
    }).exec().then(function(ownProductASINs) {
         return res.json(ownProductASINs);

    });
});

app.get('/api/competition-asins', requireAuth, function(req, res) {
    Competition.find({}).exec().then(function(competitionASINs) {
        return res.json(competitionASINs);
    });
});


app.get('/api/watchlist-asins', requireAuth, function(req, res) {
    Watchlist.find({}).exec().then(function(watchlistASINs) {
        return res.json(watchlistASINs);
    });
});


app.get('/api/get-review-data/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        'ASIN': req.params.ASIN
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/get-review-data5/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        $and: [{
            'ReviewRating': 5
        }, {
            'ASIN': req.params.ASIN
        }]
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/get-review-data4/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        $and: [{
            'ReviewRating': 4
        }, {
            'ASIN': req.params.ASIN
        }]
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/get-review-data3/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        $and: [{
            'ReviewRating': 3
        }, {
            'ASIN': req.params.ASIN
        }]
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/get-review-data2/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        $and: [{
            'ReviewRating': 2
        }, {
            'ASIN': req.params.ASIN
        }]
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/get-review-data1/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.find({
        $and: [{
            'ReviewRating': 1
        }, {
            'ASIN': req.params.ASIN
        }]
    }).exec().then(function(reviewDetails) {
        return res.json(reviewDetails);
    });
});

app.get('/api/getAverageRating/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([
        {
            "$match": {
                "ASIN": req.params.ASIN
            }
        },
        {
            "$group": {
                "_id": "$ASIN",
                "avgRating": {
                    "$avg": "$ReviewRating"
                }
            }
        }
    ]).exec().then(function(getAverageRating) {
        return res.json(getAverageRating);
    });
});

app.get('/api/getCountOfReviewsByRating/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([{
        "$match": {
            "ASIN": req.params.ASIN
        }
    }, {
        "$group": {
            "_id": "$ReviewRating",
            "count": {
                "$sum": 1
            }
        }
    }]).exec().then(function(getCountOfReviewsByRating) {
        return res.json(getCountOfReviewsByRating);
    });
});

app.get('/api/getCountOfReviewsByVerification/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([{
        "$match": {
            "ASIN": req.params.ASIN
        }
    }, {
        "$group": {
            "_id": "$ReviewVerifiedByAmazon",
            "count": {
                "$sum": 1
            }
        }
    }]).exec().then(function(getCountOfReviewsByVerification) {
        return res.json(getCountOfReviewsByVerification);
    });
});

app.get('/api/getCountOfReviewsByRatingFirstPageStats/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([
        {
            "$match": {
                "ASIN": req.params.ASIN
            }
        },

        {
            "$match": {
                "ReviewPageNumber": 1
            }
        },

        {
            "$group": {
                "_id": "$ReviewRating",
                "count": {
                    "$sum": 1
                }
            }
        }

    ]).exec().then(function(getCountOfReviewsByRatingFirstPageStats) {
        return res.json(getCountOfReviewsByRatingFirstPageStats);
    });
});

//End of App function API endpoints

//All User Management API endpoints
app.get('/api/getUsersWithProducts', requireAuth, function(req, res) {
    Products.find({}).populate('BusinessID').exec().then(function(getUsersWithProducts) {
        return res.json(getUsersWithProducts);
    });
});

app.get('/api/getAllUsers', requireAuth, function(req, res) {
    User.find({}).exec().then(function(getAllUsers) {
        return res.json(getAllUsers);
    });
});

app.post('/api/addProductForUser', requireAuth, function(req, res) {
    var newUserWithProduct = new Products();
    newUserWithProduct.ASIN = req.body.ASINValue;
    newUserWithProduct.BusinessID = mongoose.Types.ObjectId(req.body.selectedUserDatabaseID);
    newUserWithProduct.Locale = "www.amazon.com";
    newUserWithProduct.Category = "ASIN Category 1";

    newUserWithProduct.save(function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});
//End of All User Management API endpoints


//Endpoints to generate line and stacked bar charts


app.get('/api/getReviewSumOfUsefulBy/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([
        {
            "$match": {
                "ASIN": req.params.ASIN
            }
        },
        {
            "$group": {
                "_id": "$ASIN",
                "sumFoundUsefulBy": {
                    "$sum": "$ReviewFoundUsefulBy"
                }
            }
        }
    ]).exec().then(function(getReviewSumOfUsefulBy) {
        return res.json(getReviewSumOfUsefulBy);
    });
});


app.get('/api/getReviewSumOfUsefulOutOf/:ASIN', requireAuth, function(req, res) {
    ReviewDetail.aggregate([
        {
            "$match": {
                "ASIN": req.params.ASIN
            }
        },
        {
            "$group": {
                "_id": "$ASIN",
                "sumFoundUsefulOutOf": {
                    "$sum": "$ReviewFoundUsefulOutOf"
                }
            }
        }
    ]).exec().then(function(getReviewSumOfUsefulOutOf) {
        return res.json(getReviewSumOfUsefulOutOf);
    });
});


app.get('/api/getNumberOfReviewsByDate/:ASIN', requireAuth, function(req, res) {

    var today = new Date();
    var priorDate = new Date().setDate(today.getDate()-75);
    priorDate = new Date(priorDate).toISOString();
    //console.log("priorDate=", priorDate);


    ReviewDetail.aggregate([
    {
        "$match": {
            "ASIN": req.params.ASIN
        }
    }, 

    {
            "$match": {
                "ReviewDate": { $gte: new Date(priorDate) }               //'2012-07-01T04:00:00Z'
            }
    },
  

    {
        "$group": {
            "_id": "$ReviewDate",
            "count": {
                "$sum": 1
            }
        }
    }

    ]).exec().then(function(getNumberOfReviewsByDate) {
        return res.json(getNumberOfReviewsByDate);
    });
});



//Endof Endpoints to generate line and stacked bar charts


app.listen(process.env.PORT || port);

