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
              $scope.cves = fileJson;
        });
    };
    $scope.orderByMe = function(number) {
    // Ensure that the passed in data is a number
       var numberInt = parseInt(number);

            switch (true) {
                case (numberInt == 0):
                    return number.toString() + ' None';
                   // break;
                case (numberInt > 0 && numberInt < 4):
                    return number.toString() + ' Low';
                   // break;
                case (numberInt >= 4 && numberInt < 6.9):
                    return number.toString() + ' Medium';
                   // break;
                case (numberInt >= 7 && numberInt < 9):
                    return number.toString() + ' High';
                   // break;
                case (numberInt >= 9 && numberInt <= 10):
                    return number.toString() + ' Critical';
                   // break;
                default:
                    return numberInt;
            }
        }
}]);

