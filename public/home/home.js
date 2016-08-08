'use strict';

angular.module('clavisApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/index.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$http','$scope',function($http,$scope) {

    var files = $http.get('/api/home').success(function(fileJson){
        return fileJson;
      });
    files.then(function(file){
        $scope.filesGet = file.data;
      });

    $scope.callCve = function(id) {
        var cves = $http.get('/api/home/'+id).success(function(fileJson){
            return fileJson;
        });
    };


}]);