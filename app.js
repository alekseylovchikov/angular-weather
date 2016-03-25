'use strict';

const config = {
	apiKey: 'ec6f6d31cbbd4a70207a854f166df01c'
};

let myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/about', {
		templateUrl: 'pages/about.html',
		controller: 'aboutController'
	})
});

myApp.controller('mainController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	$scope.city = '';
	
	$scope.handleCity = function() {
		$http.get('//api.openweathermap.org/data/2.5/weather?q=' + $scope.city + '&lang=ru&units=metric&appid=' + config.apiKey)
			.success(function(result) {
				$scope.weather = result;
			})
			.error(function(data, status) {
				console.log(data, status);
			});
	};
}]);

myApp.controller('aboutController', ['$scope', function($scope) {

}]);
