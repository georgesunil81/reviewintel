angular.module('ReviewINTEL').directive('spoilerMenu', function() {
	return {
		restrict: 'AE',
		templateUrl: '/templates/spoiler-menu.html',
		controller: function($scope, userService) {

			var loadState = function() {
				$scope.is_admin = userService.checkRole('admin');
				$scope.is_moderator = userService.checkRole('moderator');
				$scope.is_normal = userService.checkRole('normal');
			};

			$scope.$on('user-change', loadState);

			loadState();
		}
	};
});