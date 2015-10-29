'use strict';

/* App Module */
var testApp = angular.module('testApp', []);

testApp.controller('testAppCtrl', ['$scope', function($scope){
	$scope.loadTab = function(tab, url) {
		alert(tab + " loaded using " + url);
	}
}])

testApp.directive('customTabs', function(){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: ['$scope', function($scope, $element) {

		 	var tabs = $scope.tabs = [];

		 	$scope.selectTab = function(tabToSelect) {
		 		console.log('tab selected: ' + tabToSelect.title);
		 		angular.forEach(tabs, function(tab, key){
		 			tab.selected = false;
		 		});
		 		tabToSelect.selected = true;
		 		tabToSelect.onTabActivatedHandler({tabName: tabToSelect.title});
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