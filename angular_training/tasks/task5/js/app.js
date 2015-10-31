'use strict';

/* App Module */
var testApp = angular.module('testApp', []);

testApp.factory('ComunicationService', function(){
	
	var listeners = {};

	return  {
		addListener: function(event, listener) {
			var eventListeners = listeners[event];
			if(!eventListeners)	{
				eventListeners = [];
				listeners[event] = eventListeners;
			}
			eventListeners.push(listener);
		},

		sendEvent: function(event, data) {
			angular.forEach(listeners[event], function(listener, key){
				listener(data);
			});
		}
	};
})

testApp.directive('customSender',  ['$rootScope', 'ComunicationService', function($rootScope, comunicationService) {
  return {
    restrict: 'E',
    scope: {broadcastEvent: '@'},
    template: 'Value to send <input ng-model="valueToSend">',
    link: function($scope, elem, attrs) {

		$scope.valueToSend = '';

		$scope.$watch('valueToSend', function(value) {

			comunicationService.sendEvent($scope.broadcastEvent, value);
		});
	}
  };
}]);

testApp.directive('customReceiver', ['$rootScope', 'ComunicationService', function($rootScope, comunicationService){
	return {
		scope: {receiveEvents: '@'}, 
		template: 'Received: {{received}}',
		link: function($scope, elem, attr, controller) {

			angular.forEach($scope.receiveEvents.split(','), function(receiveEvent, key){
				comunicationService.addListener(receiveEvent, function(data) {
					$scope.received = data;
				});
			});
			
		}
	};
}]);