'use strict';

/* App Module */
var testApp = angular.module('testApp', []);

testApp.directive('customSender', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    scope: {broadcastEvent: '@'},
    template: 'Value to send <input ng-model="valueToSend">',
    link: function($scope, elem, attrs) {

		$scope.valueToSend = '';

		$scope.$watch('valueToSend', function(value) {

			$rootScope.$broadcast($scope.broadcastEvent, value);
		});
	}
  };
}]);

testApp.directive('customReceiver', ['$rootScope', function($rootScope){
	return {
		scope: {receiveEvents: '@'}, 
		template: 'Received: {{reveived}}',
		link: function($scope, elem, attr, controller) {

			angular.forEach($scope.receiveEvents.split(','), function(receiveEvent, key){
				$rootScope.$on(receiveEvent, function (event, data) {
  					$scope.reveived = data;
				});
			});
			
		}
	};
}]);