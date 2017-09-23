angular.module("myApp", ['ngSanitize'])
   
.controller("MyController", function($scope, $http) {
	$scope.artistInput = "";
	$scope.songInput = "";

	$scope.mySongs = [];

	$scope.inputSong = function(){
		var songData = {};
		getSongData($scope.artistInput, $scope.songInput, songData, function(){
			$scope.mySongs[$scope.mySongs.length] = songData;
			//Must have the apply call, otherwise while the variable will be updated the event listener
			// will assume the method is finished and not be looking to update
			$scope.$apply();
		});
	}

	$scope.arrange = function(){
		$http.post('/arrange',$scope.mySongs)
			.success(function(data, status, headers, config){
				$scope.mySongs = data;
			})
			.error(function(data, status, headers, config){
				console.log(data);
			});
	}
});