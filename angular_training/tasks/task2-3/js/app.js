'use strict';

/* App Module */
var testApp = angular.module('testApp', []);

testApp.controller('testAppCtrl', ['$scope', '$timeout', function($scope, $timeout){

	$scope.tabs = [
		{title: "Tab1", content: 'Tab1 is loading...'},
		{title: "Second tab"},
		{title: "tab3"}
	];

	//add loader for each tab
	angular.forEach($scope.tabs, function(tab) {
		tab.loader= function() {
				if(!this.loaded) {
					var thisObj = this;
					
					//timeout simulates loading time
					$timeout(function() {
	            		thisObj.content = thisObj.title + " loaded content";
	            		thisObj.loaded = true;
					}, 3000);
				}
			}
	});
}])

testApp.directive('customTabs', function(){
	return {
		 scope: {},
		 controller: ['$scope', function($scope, $element) {

		 	var tabs = $scope.tabs = [];

		 	$scope.selectTab = function(tabToSelect) {
		 		console.log('tab selected: ' + tabToSelect.title);
		 		angular.forEach(tabs, function(tab, key){
		 			tab.selected = false;
		 		});
		 		tabToSelect.selected = true;
		 		tabToSelect.onTabActivatedHandler();
		 	};

			//this here is controller
		 	this.addtab = function(tab) {
		 		console.log('tab added: ' + tab.title);
		 		tabs.push(tab);
		 		if(tabs.length ==0) {
		 			$scope.selectTab(tab);
		 		}
		 	}

		 }],
		 restrict: 'E', 
		 templateUrl: 'custom-tabs.html',
		 transclude: true
	};
}).directive('customTab', function(){
	return {
		 scope: {
		 	title: '@',
		 	'onTabActivatedHandler' : '&onTabActivated'
		 },
		 require: '^customTabs',
		 restrict: 'E',
		 templateUrl: 'custom-tab.html',
		 transclude: true,
		link: function($scope, elem, iAttrs, customTabsCtrl) {
			customTabsCtrl.addtab($scope);
		}
	};
});