'use strict';

app.controller('HomeCtrl', ['$http','$scope',function($http,$scope ) {

    var files = $http.get('/api/home').success(function(fileJson){
        return fileJson;
      });
    files.then(function(file){
        $scope.filesGet = file.data;
      });

    $scope.callCve = function(id) {
         $http.get('/api/home/'+id).success(function(fileJson){
            return fileJson;
        });
    };
  }]);