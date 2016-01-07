angular.module('ReviewINTEL').controller('spoilerCtrl', function($scope, spoilers, spoilerService){
	$scope.spoilers = spoilers;
	$scope.addSpoiler = function() {
		spoilerService.addSpoiler({
			movie: {
				title: $scope.movieName
			},
			text: $scope.spoilerText
		}).then(function() {
			$scope.movieName = null;
			$scope.spoilerText = null;
			$scope.reload();
		})
	}

	$scope.reload = function() {
		spoilerService.getSpoilers().then(function(spoilers) {
			$scope.spoilers = spoilers;
		});
	}
});