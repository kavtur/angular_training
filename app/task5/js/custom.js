module=angular.module('task5', [])

module.service('ElementPositionService', function() {
            this.changeElementPosition=function(item, allItems){
                    var newItems=[]
                    for(var rootItem in allItems){
                      if(allItems[rootItem].name!=item.name){
                        newItems.push(allItems[rootItem]);
                      }
                    }
                  return newItems;
            }
});


module.directive('basket', function() {
    return {
      restrict: 'E',
      controller: ['$scope','ElementPositionService', function($scope,elementPositionService) {
        var basketItems = $scope.basketItems = [];
      $scope.$on('ADD_TO_BASKET', function(event, item) {
        $scope.basketItems.push(item);
        event.targetScope.items=elementPositionService.changeElementPosition(item,event.targetScope.items);
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
     controller: ['$scope','ElementPositionService', function($scope,elementPositionService) {
         $scope.items = [{name:"item1"},{name:"item2"}];
        $scope.addToBasket = function(item) {
            $scope.$broadcast('ADD_TO_BASKET', item);
        };
      $scope.$on('REMOVE_FROM_BASKET', function(event, item) {
        $scope.items.push(item);
        event.targetScope.basketItems=elementPositionService.changeElementPosition(item,event.targetScope.basketItems);
        });
     }]
    };
  });