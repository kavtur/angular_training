'use strict';

/* App Module */
var task7App = angular.module('task7', []);

/*
	initialize file dialog with files list.
*/
task7App.controller('flController', ['$scope', '$http', function($scope, $http){
	$scope.fileList = [];
	$http.get("data.json").
		success(function(data) {
			$scope.fileList = data;
	});

}]).directive('flDialog', function(){

	return {
		//matches directive container by element name
		restrict: 'E',

		scope: {
			fileList: '=',
			title: '@'
		},
		/*wrap flDialog content in a div*/
		template: '<div></div>',
		link: function($scope, elem, attrs, controller) {

  			var dialogDiv = elem.find('div');
  			dialogDiv.attr('title', $scope.title);
  			//create file-dialog widget object on flDialog container rendered
			var fileListWidget = $(dialogDiv).filelist({
				//overide widget field 
	        	fileList: $scope.fileList,
	        	// add new method to dialog widget which will be triggered on file changed (from jquery widget)
		        onValueChanged: function(evt, file) {
		        	 file=!file.selected
					 $scope.$apply($scope.fileList)
		        }
      		});

			// make angular react on any changes in fileList.
			$scope.$watch('fileList', function(value) {
					$(dialogDiv).filelist('updateFiles', value);
			})

		}
	};
});

