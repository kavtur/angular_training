module=angular.module('task6', [])

module.service('DateTimeService', ['$timeout',function($timeout) {
            this.changeTime=function(scope){
              var thisObj=this;
              //I know about interval ;)
                  $timeout(function() {
                           scope.changedValue= new Date();
                           scope.mechanism="Angular ($timeout)";
                           thisObj.changeTime(scope);
                        }, 5000);
            }
}]);

module.controller('dateController', ['$scope','DateTimeService',function($scope,dateTimeService) {
        $scope.changedValue="InitialValue";
        $scope.mechanism="Angular ($timeout)";
        
        dateTimeService.changeTime($scope);
        runJsTimeout($scope);
      
}]);

function runJsTimeout(scope){
  setTimeout(function(){
      scope.changedValue= new Date();
      scope.mechanism="Regular (setTimeout)";
      scope.$apply();
      runJsTimeout(scope);
  },6000);

}

module.controller('ajaxController', ['$scope', '$http', function($scope, $http){

      $scope.onClick=function(){
        $http({
              method: 'GET',
              url: 'http://www.google.com'
            }).then(function successCallback(response) {
                $scope.ajaxResponse = response;
              }, function errorCallback(response) {
                $scope.ajaxResponse = response;
        });
      }


}])

