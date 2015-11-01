
module=angular.module('task2', [])
module.controller('task2Controller', ['$scope',  function($scope) {
  $scope.tabActivated = function (name) {
    console.log("tab "+name+" activate");
  };
}])

module.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: ['$scope', function($scope) {
        var tabs = $scope.tabs = [];

        $scope.select = function(tab) {
          angular.forEach(tabs, function(tab) {
            tab.selected = false;
          });
          tab.selected = true;
          tab.onActivated(tab);
        };

        this.addTab = function(tab) {
          if (tabs.length === 0) {
            $scope.select(tab);
          }
          tabs.push(tab);
          console.log(tab.name+" Tab added");
        };
      }],
      templateUrl: 'tabs-content.html'
    };
  })
  .directive('tab', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: {
         name: '@',
         'onActivated':"&onTabActivated"
      },
      link: function(scope, element, attrs, tabsCtrl) {
      	tabsCtrl.addTab(scope);
      },
      templateUrl: 'tab.html'
    };
  });