angular.module('ReviewINTEL').controller('loginCtrl', function($scope, $mdDialog, $mdMedia, userService, $state) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };
    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam');
        $mdDialog.show(confirm).then(function() {
            $scope.status = 'You decided to get rid of your debt.';
        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };
    $scope.showAdvanced = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    $scope.showTabDialog = function(ev) {
        console.log("Comes in to show tab dialog for login");

        $mdDialog.show({
                controller: DialogController,
                templateUrl: '../app/templates/loginDiag.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
});

function DialogController($scope, $mdDialog, userService, $state) {

    // Set the default value of inputType
    $scope.inputType = 'password';


    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };


    $scope.login = function() {

        console.log("Coming in to log the user in...");

        userService.login({
            username: $scope.username,
            password: $scope.password
        }).then(function() {

            console.log("User validated as a valid user...");
            $mdDialog.hide(); //hide the login dialog since the user is valid...

            userService.getAuthedUser(); //this will load current user into cache as well as trigger event broadcast for directives
            $state.go('auth.memberHomePage');
            $scope.credentials = {}
        }).catch(function(err) {
            console.log("Login error ", err);
        });

    }

    $scope.showOrHide = function () {
        //alert("Show or hide password...");
        if ($scope.inputType == 'password') {
            $scope.inputType = 'text';
        }
        else {
            $scope.inputType = 'password';
        }
    }

    $scope.$on('invaliduser', function() {
        console.log('|||||||||||||||||||Invalid user...put this on the dialog box');
        //$scope.error = "Invalid user! Either your username or password is incorrect. Please retry";
        $scope.error = "Invalid user! Please retry...";
        //$scope.$broadcast('highchartsng.reflow');

        
        //$timeout( function() {        
        //    var element = document.getElementById("chart1");
        //    console.log(element);
        //    $compile(element)($scope)
        //}); 
    });

}