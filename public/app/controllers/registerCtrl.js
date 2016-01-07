angular.module('ReviewINTEL').controller('registerCtrl', function($scope, userService, $state) {

    $scope.register = function() {

        userService.addUser({
            username: $scope.username,
            password: $scope.password
        }).then(function(res) {
            //$state.go('auth.spoilers');
            $scope.error = "User " + $scope.username + " successfully registered.";
        }).catch(function(err) {
            console.log("Registration error " + err);
            if (err.status) {
                $scope.error = "Sorry, that user already exists.";
            }
        });
    }

    $scope.registeredUser = {};

    $scope.registerUser = function(user) {

        $scope.registeredUser = user;
    }

});