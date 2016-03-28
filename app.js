var config = {
	apiKey: 'ec6f6d31cbbd4a70207a854f166df01c'
};

var myApp = angular.module('myApp', ['ngRoute']);

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

myApp.controller('mainController', ['$scope', '$filter', '$http', '$log', '$window', function($scope, $filter, $http, $log, $window) {
	$scope.city = '';
	$scope.addedCitys = true;
	$scope.noAddedCitys = false;

	$scope.citys = [
		{
			name: 'Moscow',
			temp: '8'
		},
		{
			name: 'Borovichi',
			temp: '5.6'
		},
		{
			name: 'Novgorod',
			temp: '7'
		}
	];

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
}]);
