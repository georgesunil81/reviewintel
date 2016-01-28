// Application module
var app = angular.module('ReviewINTEL', ['ui.router', 'ngMaterial', 'ngMessages', 'highcharts-ng']);



app.run(['$rootScope', '$window', function($rootScope, $window) {
        var timeout;

        console.log("Window event listener for reflowing charts...");

        $window.addEventListener('resize', function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                $rootScope.$broadcast('window.resize');
            }, 100);
        });
    }]);

app.config(function($urlRouterProvider, $stateProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {

    $stateProvider
        .state('landingpage', {
            url: '/landingpage',
            templateUrl: 'app/templates/landingpage.html',
            controller: 'LandingPageCtrl'
        })


    .state('MemberHomepage', {
        url: '/MemberHomepage',
        templateUrl: 'app/templates/MemberHomepage.html',
        controller: 'MemberHomepageCtrl',

    })

    .state('home', {
            url: '/home',
            templateUrl: 'app/templates/home.html',
            controller: 'homeCtrl'
        })
    
    .state('login', {
            url: '/login',
            templateUrl: 'app/templates/loginDiag.html',
            controller: 'loginCtrl'
        })

    .state('logout', {
            url: '/logout',
            controller: function(userService, $state) {
                console.log("Going to call userService logout function...");
                userService.logout().then(function() {
                    $state.go('landingpage');
                });
            }
        })
    
    .state('register', {
            url: '/register',
            templateUrl: 'app/templates/register.html',
            controller: 'registerCtrl'
        })
        .state('auth', {
            abstract: true,
            template: '<ui-view></ui-view>',
            resolve: {
                user: function(userService) {
                    return userService.getAuthedUser()
                }
            }
        })

    .state('auth.memberHomePage', {
        url: '/homepage',
        templateUrl: 'app/templates/MemberHomePage.html',
        controller: 'MemberHomePageController'
    })

    .state('auth.profile', {
        url: '/profile',
        templateUrl: 'app/templates/profile.html',
        controller: 'profileCtrl'
    })

    .state('auth.friends', {
        url: '/me/friends',
        templateUrl: 'app/templates/friends.html',
        controller: 'friendsCtrl'
    });

    $urlRouterProvider.otherwise('/landingpage');

    $httpProvider.interceptors.push(function($q, $injector, $location,$rootScope) {
        return {
            // This is the responseError interceptor
            responseError: function(rejection) {
                console.log("BAD DOG", rejection);
                if (rejection.status === 401) {
                    //document.location = "/#/login";

                    $rootScope.$broadcast('invaliduser');

                    document.location = "/#/landingpage";
                }

                /* If not a 401, do nothing with this error.
                 * This is necessary to make a `responseError`
                 * interceptor a no-op. */
                return $q.reject(rejection);
            }
        };
    });
});