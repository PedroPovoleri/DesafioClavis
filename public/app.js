'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('clavisApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    templateUrl: 'home/index.html',
    controller: 'HomeCtrl'
  }).otherwise({redirectTo: '/home'});
}]);
