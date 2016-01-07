angular.module('ReviewINTEL').controller('ManageUsersController', ['$scope', '$q', '$timeout', 'ManageUsersService', ManageUsersController]);

function ManageUsersController($scope, $q, $timeout, ManageUsersService) {

    var userListWithProducts = [];
    var allUsers = [];

    $scope.user = null;
    $scope.users = null;

    var userDatabaseIDListWithProducts = [];
    var userObj = {};
    var userListWithoutProducts = [];

    $scope.loadUsers = function() {
        $scope.users = null;
        ManageUsersService.getUsersWithProducts()
            .then(function(res) { //to get the product ASIN(s) for the current user                

                for (var i = 0; i < res.data.length; i++) {
                    userDatabaseIDListWithProducts[i] = res.data[i].BusinessID._id;
                }               

                return ManageUsersService.getAllUsers();
            })
            .then(function(res) { //to get the product ASIN(s) for the current user                

                for (var j = 0; j < res.data.length; j++) {
                    
                    if (userDatabaseIDListWithProducts.indexOf(res.data[j]._id) === -1) {
                        userObj = {};
                        userObj.username = res.data[j].username;
                        userObj._id = res.data[j]._id;
                        userListWithoutProducts.push(userObj);

                    }                    

                }

                $scope.users = $scope.users || userListWithoutProducts;
            });

    };

    $scope.editUser = function(selectedUserDatabaseID) {

        ManageUsersService.addProductForUser(selectedUserDatabaseID, $scope.ASINValue).then(function(res) {            
            $scope.users = null;
            $scope.ASINValue = "";
            //Put a meessage of success on the UI
            $scope.StatusMessage = "Product Id updated for the selected user successfully";
        });

    }

}

