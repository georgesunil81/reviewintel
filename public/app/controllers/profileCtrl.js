angular.module('ReviewINTEL').controller('profileCtrl', function($scope, user, userService){
  $scope.username = user.username;
  $scope.user = user;

	$scope.is_admin = userService.checkRole('admin');
	$scope.is_moderator = userService.checkRole('moderator');
	$scope.is_normal = userService.checkRole('normal');
})