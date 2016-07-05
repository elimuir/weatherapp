
var config = {
  "API_KEY": "3b8845b73507cc4d320b06dd37500a18"
}

var weatherApp = angular.module('weatherApp', ['serviceWeatherForecast', 'ui.router']);


weatherApp.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
          url:'/',
          views: {
            'header': {
                templateUrl: 'app/pageelements/header.html'
              },
            'page': {
                templateUrl: 'app/weatherforecast/weatherforecast.template.html',
                controller: 'ctrlWeatherForecast',
                views: {
                  'popup': {templateUrl: "app/weatherforecast/forecast.html"}
                }
              }
          }
      });

  }
]);
