'use strict';

/* App Module */
var testApp = angular.module('testApp', []);

testApp.controller('timeoutController', ['$scope', '$interval', function($scope, $interval){
	
	$scope.timeoutValue = new Date();

	//$interval(function() {$scope.timeoutValue = new Date()}, 1000);

	//setInterval(function() {$scope.timeoutValue = new Date()}, 1000);
}]);


testApp.controller('ajaxController', ['$scope', '$http', function($scope, $http){

	/*$http.get("data.txt").
		success(function(data) {
			$scope.content = data;
		});*/


	/*$.ajax({
 	 url: "data.txt"
	}).done(function(data) {
  		$scope.content = data;
	});*/
}])

testApp.controller('clickController', ['$scope', function($scope){
	
	$scope.showContent = function() {
		$scope.content = 'Hidden content angular';
	}

	$('#jsButton').click(function() {
		$scope.content = 'Hidden content js';
	});

}])

