angular.module('ReviewINTEL').service('ManageUsersService', function($http, $location, $q, $rootScope) {

    this.getUsersWithProducts = function() { ////to get the product ASIN(s) for the current user
        
        return $http({
            method: 'GET',
            url: '/api/getUsersWithProducts'
        }).then(function(res) {
            console.log("Users with products List: ", res);
            return res;
        });
    };

    this.getAllUsers = function() { ////to get the product ASIN(s) for the current user
        
        return $http({
            method: 'GET',
            url: '/api/getAllUsers'
        }).then(function(res) {

            console.log("getAllUsers: ", res);
            return res;

        });
    };

    this.addProductForUser = function(selectedUserDatabaseID, ASINValue) { ////to get the product ASIN(s) for the current user

        return $http({
            method: 'POST',
            url: '/api/addProductForUser',
            data: {
                'selectedUserDatabaseID': selectedUserDatabaseID,
                'ASINValue': ASINValue
            }
        }).then(function(res) {

            console.log("addProductForUser from service: ", res);
            return res;

        });
    };


    this.getOwnProductASINs = function(userID) { ////to get the product ASIN(s) for the current user

        return $http({
            method: 'GET',
            url: '/api/own-product-asins/' + userID
        }).then(function(res) {

            console.log("Own product ASIN(s) from service: ", res);
            return res;

        });
    };


    this.getCompetitionASINs = function() {

        return $http({
            method: 'GET',
            url: '/api/competition-asins'
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };


    this.getWatchListASINs = function() {

        return $http({
            method: 'GET',
            url: '/api/watchlist-asins'
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };


    this.getReviews = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };

    this.getReviews5 = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data5/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };
    this.getReviews4 = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data4/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };
    this.getReviews3 = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data3/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };
    this.getReviews2 = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data2/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };

    this.getReviews1 = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/get-review-data1/' + ASIN
        }).then(function(res) {

            console.log(res);
            return res;

        });
    };

    this.getAverageRating = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/getAverageRating/' + ASIN
        }).then(function(res) {

            console.log("Count of reviews by getAverageRating: ", res);
            return res;

        });
    };


    this.getCountOfReviewsByRating = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/getCountOfReviewsByRating/' + ASIN
        }).then(function(res) {

            console.log("Count of reviews by rating: ", res);
            return res;

        });
    };

    this.getCountOfReviewsByVerification = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/getCountOfReviewsByVerification/' + ASIN
        }).then(function(res) {

            console.log("Count of reviews by getCountOfReviewsByVerification: ", res);
            return res;

        });
    };

    this.getCountOfReviewsByRatingFirstPageStats = function(ASIN) {

        return $http({
            method: 'GET',
            url: '/api/getCountOfReviewsByRatingFirstPageStats/' + ASIN
        }).then(function(res) {

            console.log("Count of reviews by getCountOfReviewsByRatingFirstPageStats: ", res);
            return res;

        });
    };
})