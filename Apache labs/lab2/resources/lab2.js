$(document).ready(function(){

   var x = document.getElementById('x');

   // initialized as default values for Troy NY
   var lat = 42;
   var lon = -73;
   var owKEY = "&appid=c2ea0e2e657fd4f20d4d036e8ed3e44d"

   // if user acccpets location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
  } else {
     $('#notif_box').html("locaiton information not available... Showing weather for: Troy NY")
  }

  function getPosition(position) {
     lat = Math.trunc(position.coords.latitude);
     lon = Math.trunc(position.coords.longitude);
     var lat_lon_link = "lat=" + lat + "&lon=" + lon + "&units=imperial" + owKEY;
     var owAPI = "https://api.openweathermap.org/data/2.5/weather?" + lat_lon_link;

     console.log(owAPI);
     $.getJSON("https://api.openweathermap.org/data/2.5/weather?zip=12180,us&units=imperial&appid=c2ea0e2e657fd4f20d4d036e8ed3e44d", function(weather){
        $('#city').html(weather.name);
        $('#temp').html(weather.main.temp);
        $('#f_like').html(weather.main.feels_like);
        $('#condit').html(weather.weather[0].description);

     });



     var loc = "Latitude: " + lat + "<br>Longitude: " + lon;
     $('#x').html(loc);
  };

   function showError(error) {
     switch(error.code) {
       case error.PERMISSION_DENIED:
         $('#notif_box').html("locaiton information denied... Showing weather for: Troy NY")
         break;
       case error.POSITION_UNAVAILABLE:
         $('#notif_box').html("locaiton information unavailable... Showing weather for: Troy NY")
         break;
       case error.TIMEOUT:
         $('#notif_box').htnl("locaiton information timed out... Showing weather for: Troy NY")
         break;
       case error.UNKNOWN_ERROR:
         $('#notif_box').html("locaiton information unavailable... Showing weather for: Troy NY")
         break;
     }
   }

});
