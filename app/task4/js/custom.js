module=angular.module('task4', [])
function changeElementPosition(scope, item, allItems){
        var newItems=[]
        for(var rootItem in allItems){
          if(allItems[rootItem].name!=item.name){
            newItems.push(allItems[rootItem]);
          }
        }
      return newItems;
}
module.directive('basket', function() {
    return {
      restrict: 'E',
      controller: ['$scope', function($scope) {
        var basketItems = $scope.basketItems = [];
      $scope.$on('ADD_TO_BASKET', function(event, item) {
        $scope.basketItems.push(item);
        event.targetScope.items=changeElementPosition($scope,item,event.targetScope.items);
      });
      $scope.removeFromBasket = function(item) {
            $scope.$broadcast('REMOVE_FROM_BASKET', item);
        };
      }]
    };
  });
module.directive('itemsList', function() {
    return {
      require: '^basket',
      restrict: 'E',
     controller: ['$scope', function($scope) {
         $scope.items = [{name:"item1"},{name:"item2"}];
        $scope.addToBasket = function(item) {
            $scope.$broadcast('ADD_TO_BASKET', item);
        };
      $scope.$on('REMOVE_FROM_BASKET', function(event, item) {
        $scope.items.push(item);
        event.targetScope.basketItems=changeElementPosition($scope,item,event.targetScope.basketItems);
        });
     }]
    };
  });