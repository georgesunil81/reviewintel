angular.module('ReviewINTEL').service('spoilerService', function($http, $q) {

    this.getSpoilers = function(newUser) {
        var dfd = $q.defer();
        $http({
            method: 'GET',
            url: '/api/spoilers'
        }).then(function(result) {
            dfd.resolve(result.data);
        });
        return dfd.promise;
    };

    this.addSpoiler = function(spoiler) {
        return $http({
            method: 'POST',
            url: '/api/spoilers',
            data: spoiler
        })
    };

});