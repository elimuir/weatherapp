
angular
  .module('serviceWeatherForecast')
  .factory("serviceWeatherForecast", ['$http', '$q', '$interval', function($http, $q, $interval){
    var weatherForecast = {};

    weatherForecast.currentForecast = function($lat, $lng, $time){

      var deferred = $q.defer();

      $http.jsonp('https://api.forecast.io/forecast/'+ config.API_KEY +'/'+ $lat +','+ $lng +","+ $time +'?callback=JSON_CALLBACK')
        .then(
          function(response) { // Success callback
            if(response.data) {
              deferred.resolve(response.data);
            }
            else {
              deferred.resolve("unable to get weather forecast");
            }
        });

      return deferred.promise;

    };

    return weatherForecast;
  }]);
