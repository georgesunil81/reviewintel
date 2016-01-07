angular.module('ReviewINTEL').service('userService', function($http, $location, $q, $rootScope) {
    var user;

    this.addUser = function(newUser) {        
        
        return $http({
            method: 'POST',
            url: '/api/userRegistration',
            data: newUser
        });
    };

    this.login = function(credentials) {        

        var dfd = $q.defer()
        $http({
            method: 'POST',
            url: '/api/auth/local',
            data: credentials
        }).then(function(res) {
            dfd.resolve(res.data);
        });
        return dfd.promise;
    }

    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/api/auth/logout'
        }).then(function() {
                        
            user = null;
            $rootScope.user = null;
            $rootScope.$emit('user-change', null);
        });
    }

    this.getAuthedUser = function() {
        var dfd = $q.defer()
        if (user) {
            dfd.resolve(user);
        } else {
            $http({
                method: 'GET',
                url: '/api/users/currentUser'
            }).then(function(res) {
                user = res.data;
                $rootScope.user = user; 
                $rootScope.$broadcast('user-change', null);
                dfd.resolve(res.data);
            });
        }
        return dfd.promise;
    };

    this.checkRole = function(role) {        

        if (!user || !user.roles || user.roles.indexOf(role) < 0) {
            return false;
        }
        
        return true;
    }
})