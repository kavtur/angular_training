'use strict';

/* App Module */
var testApp = angular.module('testApp', []);


testApp.controller('listFilesCtrl', ['$scope', '$http', function($scope, $http){
	$scope.listFiles = [];
	$http.get("data.json").
		success(function(data) {
			$scope.listFiles = data;
	});

}]).directive('listFilesDialog', function(){

	return {
		restrict: 'E',

		scope: {
			listFiles: '=',
			title: '@'
		},

		template: '<div></div>',
		link: function($scope, elem, attrs, controller) {

  			var dialogDiv = elem.find('div');
  			dialogDiv.attr('title', $scope.title);
			var listFilesWidget = $(dialogDiv).filelist({
	        	listFiles: $scope.listFiles,

		        onValueChanged: function(evt, file) {

		          $scope.$apply(function () {
		          	if($scope.listFiles.length > 0) {
            			$scope.listFiles[0].selected = $scope.listFiles[0].selected;
            		}
        		  });

		        }
      		});

			$scope.$watch('listFiles', function(value) {
				if(value.length > 0) {
					$(dialogDiv).filelist('updateFiles', value);
				}
			})

		}
	};
});

