var config = {
	apiKey: 'ec6f6d31cbbd4a70207a854f166df01c'
};

var myApp = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/main.html',
			controller: 'mainController'
		});
});

myApp.directive('savedCity', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/savedcity.html',
		replace: true,
		scope: {
			cityObject: '='
		}
	};
});

myApp.controller('mainController', ['$scope', '$filter', '$http', '$log', '$window', 'localStorageService', function($scope, $filter, $http, $log, $window, localStorageService) {
	$scope.city = '';
	$scope.savedCitys = [];
	$scope.haveSavedCitys = function() {
		return localStorageService.keys().length >= 1;
	};
	$scope.noHaveSavedCitys = function() {
		return localStorageService.keys().length < 1;
	};

	if (localStorageService.keys().length >= 1) {
		localStorageService.keys().forEach(function(key) {
			$scope.savedCitys.push(localStorageService.get(key));
		});
	}

	$window.navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude,
			lon = position.coords.longitude;

		$scope.$apply(function() {
			$scope.lat = lat;
			$scope.lon = lon;

			$http.get('//api.openweathermap.org/data/2.5/weather?lat=' + $scope.lat + '&lon=' + $scope.lon + '&units=metric&lang=ru&appid=' + config.apiKey)
				.success(function(data) {
					$scope.geopositionWeather = data;
				});
		});
	});

	$scope.handleCity = function() {
		$http.get('//api.openweathermap.org/data/2.5/weather?q=' + $scope.city + '&units=metric&lang=ru&appid=' + config.apiKey)
			.success(function(data) {
				$scope.weatherResult = data;
			});
	};

	$scope.addCity = function() {
		if ($scope.weatherResult.name !== undefined) {
			localStorageService.set($scope.weatherResult.name, $scope.weatherResult);
			$scope.savedCitys.push(localStorageService.get($scope.weatherResult.name));
		}
	};
}]);
