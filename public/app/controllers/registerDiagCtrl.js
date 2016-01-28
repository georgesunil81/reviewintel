angular.module('ReviewINTEL').controller('registerDiagCtrl', function($scope, $mdDialog, $mdMedia, userService, $state) {

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
    $scope.showTabDialogForRegistration = function(ev) {
        $mdDialog.show({
                controller: RegisterDialogController,
                templateUrl: '../app/templates/registerDiag.html',
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







function RegisterDialogController($scope, $mdDialog, userService, $state) {

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

    $scope.registerDemoUser = function() {

        userService.addDemoUser({
            username: $scope.username,
            password: $scope.password
        }).then(function(res) {
            //$state.go('auth.spoilers');
            //$scope.error = "User '" + $scope.username + "' successfully registered. You may now log in.";
            $scope.error = "Registered. You may now log in.";
        }).catch(function(err) {
            console.log("Registration error " + err);
            if (err.status) {
                $scope.error = "Sorry, that user already exists. Please choose another username.";
            }
        });
    }

    $scope.registeredUser = {};

    $scope.registerUser = function(user) {

        $scope.registeredUser = user;
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

}