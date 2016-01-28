angular
    .module('ReviewINTEL')
    .controller('MemberHomePageController', ['$rootScope', '$scope', '$mdMedia', '$mdSidenav', '$timeout', '$window', 'userService', 'MemberHomePageService', MemberHomePageController]);


function MemberHomePageController($rootScope, $scope, $mdMedia, $mdSidenav, $timeout, $window, userService, MemberHomePageService) {

    //Determine user and user roles
    var userID = $rootScope.user._id; //User is now available in the root scope. User object with all its attributes from db is added to the rootScope in the userService.js after the user gets authed successfully

    var avgRating = [0];
    var countOfReviewsByRating = [0, 0, 0, 0, 0];
    var countOfVerifiedUnverified = [{
        name: 'Verified',
        y: 0
    }, {
        name: 'Unverified',
        y: 0
    }];
    var countOfReviewsByRatingFirstPageStats = [0, 0, 0, 0, 0];

    var countOfNeutralUsefulness = [0];
    var countOfUsefulness = [0];
    var countOfReviewsByDateArrayOfDates = [];
    var countOfReviewsByDateArrayOfCounts = [];


    $scope.is_admin = userService.checkRole('Admin');
    $scope.is_mentor_org_owner = userService.checkRole('MentorOrgOwner');
    $scope.is_mentor = userService.checkRole('Mentor');
    $scope.is_business_owner = userService.checkRole('BusinessOwner');

    $scope.is_function_dashboard = true; //this will generate the default view (dashboard) for the user
    //End of Determine user and user roles

    //Get all of own ASINs

    var ASIN = ""; //ASIN is now set by the first API call in the promise chain below.

    MemberHomePageService.getOwnProductASINs(userID)
        .then(function(res) { //to get the product ASIN(s) for the current user
            console.log("The own product ASIN(s) containing object is ", res);
            $scope.ownProductASINs = res.data;
            console.log($scope.ownProductASINs);
            ASIN = res.data[0].ASIN;
            console.log("The own product ASIN(s) is ", ASIN);
            return MemberHomePageService.getReviews(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews = res.data;
            console.log("==============ASIN in the inner then within the promise chain: ", ASIN);
            return MemberHomePageService.getReviews5(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews5 = res.data;
            return MemberHomePageService.getReviews4(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews4 = res.data;
            return MemberHomePageService.getReviews3(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews3 = res.data;
            return MemberHomePageService.getReviews2(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews2 = res.data;
            return MemberHomePageService.getReviews1(ASIN);
        })
        .then(function(res) {
            console.log(res);
            $scope.Reviews1 = res.data;
            //return MemberHomePageService.getReviews1(ASIN);
            return MemberHomePageService.getAverageRating(ASIN);
        })
        .then(function(res) {
            console.log("Count of reviews by getAverageRating: ", res);
            //$scope.Reviews1 = res.data;

            for (var i = 0; i < res.data.length; i++) {
                console.log("i=", i, " rating data=", res.data[i]._id);
                console.log("i=", i, " count data=", res.data[i].avgRating);
                //avgRating[i] = res.data[i].avgRating;
                avgRating[i] = Number((res.data[i].avgRating).toFixed(2)); //res.data[i].avgRating.toFixed(2);
            }

            console.log("2)Count of reviews by getAverageRating: ", avgRating);
            return MemberHomePageService.getCountOfReviewsByRating(ASIN);
        })
        .then(function(res) {
            console.log("Count of reviews by rating: ", res);
            //$scope.Reviews1 = res.data;

            for (var i = 0; i < res.data.length; i++) {
                console.log("i=", i, " rating data=", res.data[i]._id);
                console.log("i=", i, " count data=", res.data[i].count);
                countOfReviewsByRating[res.data[i]._id - 1] = res.data[i].count;
            }

            console.log("2)Count of reviews by rating: ", countOfReviewsByRating);
            return MemberHomePageService.getCountOfReviewsByVerification(ASIN);
        })
        .then(function(res) {
            console.log("In controller...Count of reviews by getCountOfReviewsByVerification: ", res);
            //$scope.Reviews1 = res.data;

            //countOfVerifiedUnverified = [{name: 'Verified', y: 13}, {name: 'Unverified', y: 18}];

            for (var i = 0; i < res.data.length; i++) {

                if (res.data[i]._id === 'Y') {
                    countOfVerifiedUnverified[0].y = res.data[i].count;
                }

                if (res.data[i]._id === 'N') {
                    countOfVerifiedUnverified[1].y = res.data[i].count;
                }

                console.log("i=", i, " rating data=", res.data[i]._id);
                console.log("i=", i, " count data=", res.data[i].count);

            }

            console.log("2)Count of reviews by getCountOfReviewsByVerification: ", countOfVerifiedUnverified);
            return MemberHomePageService.getCountOfReviewsByRatingFirstPageStats(ASIN);
        })
        .then(function(res) {
            console.log("Count of reviews by rating: ", res);
            //$scope.Reviews1 = res.data;

            for (var i = 0; i < res.data.length; i++) {
                console.log("i=", i, " rating data=", res.data[i]._id);
                console.log("i=", i, " count data=", res.data[i].count);
                countOfReviewsByRatingFirstPageStats[res.data[i]._id - 1] = res.data[i].count;
            }

            console.log("2)Count of reviews by rating: ", countOfReviewsByRatingFirstPageStats);

            return MemberHomePageService.getReviewSumOfUsefulBy(ASIN);
        })
        .then (function(res) {
            console.log("********************getReviewSumOfUsefulBy: ", res.data[0].sumFoundUsefulBy);

            //var countOfNeutralUsefulness = [];
            //countOfUsefulness.push(res.data[0].sumFoundUsefulBy);
            countOfUsefulness[0] = res.data[0].sumFoundUsefulBy;

            return MemberHomePageService.getReviewSumOfUsefulOutOf(ASIN);
        })
        .then (function(res) {
            console.log("********************getReviewSumOfUsefulOutOf: ", res.data[0].sumFoundUsefulOutOf);

            countOfNeutralUsefulness[0] = res.data[0].sumFoundUsefulOutOf - countOfUsefulness[0];

            return MemberHomePageService.getNumberOfReviewsByDate(ASIN);



        })
        .then (function(res) {

            console.log("SORTING********************getNumberOfReviewsByDate: ", res);


            var d;

            //d = new Date('2013-03-10T02:00:00Z');
            //this sorting has to be done on the client side here, since mongoose aggregate sort does not work on group pipes.
            res.data.sort(function(a,b) { 
                return new Date(a._id).getTime() - new Date(b._id).getTime() 
            });

            //d.toLocaleDateString();

            for (var i = 0; i < res.data.length; i++) {

                d = new Date(res.data[i]._id);                

                //countOfReviewsByDateArrayOfDates.push(res.data[i]._id);
                countOfReviewsByDateArrayOfDates.push(d.toLocaleDateString());
                countOfReviewsByDateArrayOfCounts.push(res.data[i].count);
            }


            $scope.chartConfig1.loading = false;
            $scope.chartConfig2.loading = false;
            $scope.chartConfig3.loading = false;
            $scope.chartConfig4.loading = false;
            $scope.chartConfig5.loading = false;
            $scope.chartConfig6.loading = false;


        });


    //End of Get data for the charts

    $scope.redirectToURL = function(url) {
        console.log("Redirect function called..." + url);
        $window.open('http://' + url, '_blank');
    };



    var charts = [{
        site: 'Review Rating'
    }, {
        site: 'Rating Vs # of Reviews'
    }, {
        site: 'Verified Vs Unverified Reviews'
    }, {
        site: 'First Page Stats'
    }, {
        site: 'Reviews With Comments'
    }, {
        site: 'Rate Of Reviews'
    }, {
        site: 'Review Properties'
    }];

    $scope.charts = charts;

    var tags = {};
    for (var i = 0; i < charts.length; i++) {
        if (!charts[i] || !angular.isArray(charts[i].tags)) {
            continue;
        }
        for (j = 0; j < charts[i].tags.length; j++) {
            var tag = charts[i].tags[j];
            if (tags[tag]) {
                tags[tag]++;
            } else {
                tags[tag] = 1;
            }
        }
    }

    var tagList = [];
    for (tag in tags) {
        tagList.push({
            name: tag,
            count: tags[tag],
            selected: false
        });
    }

    $scope.tags = tagList.sort(
        function(a, b) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
    );

    $scope.toggleTag = function(tag) {
        tag.selected = !tag.selected;
    };

    $scope.getFilteredDives = function() {
        var filterTags = getFilteredTags();
        var filteredDives = $scope.charts.filter(
            function(dive) {
                return filterTags.every(
                    function(value) {
                        return dive.tags.indexOf(value.name) >= 0;
                    });
            }
        );
        return filteredDives;
    };

    $scope.hideTagBar = function() {
        return tagsHidden();
    };

    $scope.enableShowTags = function() {
        return tagsHidden() && !$mdSidenav('tagsFilter').isOpen();
    };

    $scope.showTags = function() {
        $mdSidenav('tagsFilter').open();
        console.log("Sidenav opened...");
        //$rootScope.$broadcast('sidenav.closed');
        $scope.$broadcast('highchartsng.reflow');   //this will trigger the reflow function of all the charts
    };

    $scope.enableCloseTags = function() {
        return tagsHidden() && $mdSidenav('tagsFilter').isOpen();
    };

    $scope.closeTags = function() {
        $mdSidenav('tagsFilter').close();

        console.log("Sidenav closed...");
        //$rootScope.$broadcast('sidenav.closed');
        $scope.$broadcast('highchartsng.reflow');   //this will trigger the reflow function of all the charts
    };

    // Listen to window resize and update width.
    $scope.$on('window.resize', function() {
        console.log('window resized...');
        //$scope.$broadcast('highchartsng.reflow');

        $timeout(function() {
                console.log("Going to reflow charts...");
                $scope.$broadcast('highchartsng.reflow');
            }, 500);
        //$timeout( function() {        
        //    var element = document.getElementById("chart1");
        //    console.log(element);
        //    $compile(element)($scope)
        //}); 
    });
        // Listen to window resize and update width.
    $scope.$on('sidenav.closed', function() {
        console.log('sidenav.closed...');
        //$timeout( function() {        
        //    var element = document.getElementById("chart1");
        //    console.log(element);
        //    $compile(element)($scope)
        //}); 
        //$timeout(function() {
                $scope.chartConfig1.func($scope.chartConfig1);
            //}, 0);
    });

    $scope.showFiltered = function() {
        return tagsHidden() && getFilteredTags().length > 0;
    };

    $scope.isFilterOn = function() {
        return getFilteredTags().length > 0;
    };

    function getFilteredTags() {
        return $scope.tags.filter(
            function(tag) {
                return tag.selected;
            });
    }

    function tagsHidden() {
        return !$mdMedia('gt-md');
    }


    $scope.setUserFunction = function(userFunction) {
        console.log("User selected function is " + userFunction);
        $scope.is_function_register = false;
        $scope.is_function_dashboard = false;
        $scope.is_function_reviewdata = false;
        $scope.is_function_reviewdata5 = false;
        $scope.is_function_reviewdata4 = false;
        $scope.is_function_reviewdata3 = false;
        $scope.is_function_reviewdata2 = false;
        $scope.is_function_reviewdata1 = false;
        $scope.is_function_manage_users = false;

        if (userFunction === 'register') {
            $scope.is_function_register = true;
        }

        if (userFunction === 'dashboard') {
            $scope.is_function_dashboard = true;
        }

        if (userFunction === 'review-data') {
            $scope.is_function_reviewdata = true;
        }

        if (userFunction === 'review-data5') {
            $scope.is_function_reviewdata5 = true;
        }
        if (userFunction === 'review-data4') {
            $scope.is_function_reviewdata4 = true;
        }
        if (userFunction === 'review-data3') {
            $scope.is_function_reviewdata3 = true;
        }
        if (userFunction === 'review-data2') {
            $scope.is_function_reviewdata2 = true;
        }
        if (userFunction === 'review-data1') {
            $scope.is_function_reviewdata1 = true;
        }

        if (userFunction === 'manage_users') {
            $scope.is_function_manage_users = true;
        }


    };


    //==========

    $scope.addPoints = function() {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function() {

        console.log("Add series....");
        var rnd = [];
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function() {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function() {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function() {
        this.chartConfig.loading = !this.chartConfig.loading
    }


    /*
    $scope.chartConfig1 = {

        options: {
            chart: {
                type: 'bar'
            },

            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Avg. Rating'],
                title: {
                    text: null
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rating',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                }
            }

        },
        series: [{
            data: avgRating //[4.5]
        }],
        title: {
            text: 'Avg. Review Rating'
        },

        func: function(chartConfig1) {
            $timeout(function() {
                chartConfig1.reflow();
            }, 0);
        },

        loading: false
    } 
    */

    $scope.chartConfig2 = {

        options: {
            chart: {
                type: 'column'
            },

            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '# of Reviews'
                }
            }

        },
        series: [{
            name: 'Review Rating',
            data: countOfReviewsByRating //data: [0, 0, 2, 8, 21]
        }],
        title: {
            text: 'Reviews Vs. Ratings'
        },

        func: function(chartConfig2) {
            $timeout(function() {
                chartConfig2.reflow();
            }, 0);
        },

        loading: true
    }

    $scope.chartConfig3 = {

        options: {
            chart: {
                type: 'pie'
            },

            credits: {
                enabled: false
            }

        },
        series: [{
            name: '# of Reviews',
            colorByPoint: true,
            data: countOfVerifiedUnverified //[{name: 'Verified',y: 13}, {name: 'Unverified', y: 18}]
        }],
        title: {
            text: 'Verified Vs Unverified Reviews'
        },

        func: function(chartConfig3) {
            $timeout(function() {
                chartConfig3.reflow();
            }, 0);
        },

        loading: true
    }

    $scope.chartConfig4 = {


        options: {
            chart: {
                type: 'column'
            },

            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '# of Reviews'
                }
            }

        },
        series: [{
            name: 'Review Rating',
            data: countOfReviewsByRatingFirstPageStats //[0, 0, 0, 3, 7]
        }],
        title: {
            text: 'First Page Stats'
        },

        func: function(chartConfig4) {
            $timeout(function() {
                chartConfig4.reflow();
            }, 0);
        },

        loading: true
    }

    $scope.chartConfig1 = {

        options: {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: true
        },

        title: {
            text: 'Avg. Review Rating...'
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        }},

        // the value axis
        yAxis: {
            min: 0,
            max: 5,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Avg. Rating'
            },
            plotBands: [{
                from: 0,
                to: 3,
                color: '#DF5353' // green
            }, {
                from: 3,
                to: 4,
                color: '#DDDF0D' // yellow
            }, {
                from: 4,
                to: 5,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: 'Avg. Review Rating',
            data: avgRating,//[3.75],
            tooltip: {
                valueSuffix: ' stars'
            }
        }],

        func: function(chartConfig1) {
            $timeout(function() {
                chartConfig1.reflow();
            }, 0);
        },

        loading: true
    }    




    $scope.chartConfig5 = {

        options: {
            chart: {
            type: 'line'
        },
        title: {
            text: 'Frequency of reviews'
        },
        subtitle: {
            text: 'By Review Date'
        },
        xAxis: {
            categories: countOfReviewsByDateArrayOfDates //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Number of Reviews'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },

            credits: {
                enabled: false
            }

        },
        series: [{
            name: 'Review Date',
            data: countOfReviewsByDateArrayOfCounts //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }],

        func: function(chartConfig5) {
            $timeout(function() {
                chartConfig5.reflow();
            }, 0);
        },

        loading: true
    }

    $scope.chartConfig6 = {

        options: {
            chart: {
            type: 'column'
        },
        title: {
            text: 'Review usefulness'
        },
        xAxis: {
            categories: ['Review Usefulness']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Review Opinions'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },

            credits: {
                enabled: false
            }

        },
        series: [{
            name: 'Neutral',
            data: countOfNeutralUsefulness //[5]
        }, {
            name: 'Found Useful',
            data: countOfUsefulness //[2]
        }],

        func: function(chartConfig6) {
            $timeout(function() {
                chartConfig6.reflow();
            }, 0);
        },

        loading: true
    }   

    




    



} //End of function MemberHomePageController


/*









*/