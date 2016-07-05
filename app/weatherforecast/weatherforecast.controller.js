
angular
  .module("weatherApp")
  .controller("ctrlWeatherForecast", ['$scope', 'serviceWeatherForecast', '$compile', '$http', function($scope, serviceWeatherForecast, $compile, $http) {

       // Set date to now
    $scope.searchDate = new Date().toLocaleString("en-us");

      // Init Map
    var mymap = L.map('mapid').setView([47.6296, -122.3224], 12);
    var popup = L.popup();

      // Set Map Tile Layer
    L.tileLayer('https://api.mapbox.com/styles/v1/dluxio/ciq2ubvk50060bem5nkn4iqie/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGx1eGlvIiwiYSI6ImNpcTJ1OXNhdzAxNmFmbm5uNXFoeXYzM2sifQ.DCc5J8pCcBIg980O4fPD2w', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'your.mapbox.project.id',
        accessToken: 'ciq2ubvk50060bem5nkn4iqie'
    }).addTo(mymap);

      // Setup map click to display weather conditions
    mymap.on('click', function(e){

    displayMarkerContent(e);

  });


  $scope.processForm = function(){
    if(popup._latlng){
      var e = {};
      e.latlng = popup._latlng;
      displayMarkerContent(e);
    }

  };

    // Create SkyIcon
  createWeatherIcon = function(icon){
    var skycons = new Skycons({"color": "black"});
    // on Android, a nasty hack is needed: {"resizeClear": true}
    // you can add a canvas by it's ID...
    skycons.add("weather-icon", icon);
          // start animation!
    skycons.play();
  };

    // Display map marker content
  displayMarkerContent = function(e){
    var weatherAttr = ["time", "summary", "temperature", "humidity"];

      // Get date
    var searchDate = new Date($scope.searchDate).getTime() / 1000;

      // Request weather forecast
    serviceWeatherForecast.currentForecast(e.latlng.lat, e.latlng.lng, searchDate)
      .then(
        function(response){ // Success callback
          var currentWeather = response.currently;
          var hourlyWeather = response.hourly.data;

          var map_popup_output = '<canvas id="weather-icon" width="128" height="128"></canvas>';

            // Loop and display key/value pairs for current weather
          for(var key in weatherAttr){
            if(currentWeather.hasOwnProperty(weatherAttr[key])) {
              if(weatherAttr[key] == "time") {
                currentWeather[weatherAttr[key]] = new Date(currentWeather[weatherAttr[key]] * 1000).toLocaleString("en-us");
              }
              map_popup_output += '<div class="map-point '+ weatherAttr[key] +'"/><div class="label">'+ weatherAttr[key] +': </div>'+ currentWeather[weatherAttr[key]] +'</div>';
            }
          }

          // if popup location hasn't changed, just update contents
        if(popup._latlng == e.latlng){
          popup.setContent(map_popup_output +"<br/> You clicked the map at " + e.latlng.toString());
        }
        else { // else create new popup
          popup.setLatLng(e.latlng)
            .setContent('<div ng-view="popup"></div>'+map_popup_output +"<br/> You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
        }

        createWeatherIcon(currentWeather.icon);

      });

  };

}]);
