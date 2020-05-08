// angualar app call
var app = angular.module("myApp", []);
// angular controller initializer
app.controller("loadImg", ['$scope','$http', '$log', function($scope, $http, $log){
   // during testing ran out of refreshs, so I created a second app access code
   var ogid = "client_id=6b03e46e8eae3ad42ebd08c35f9595c8f8e1153e1935194e5f44651dea48a1a8";
   var backupid = "client_id=2bf317730c6d754a3dbe2e9d82b04f7eb5b00f793fc40eb84fdb8da83fbb8cc1";
   // upsplash api call for 12 random photos with added client id access key
   var apiPhotos = "https://api.unsplash.com/photos/random?count=12&" + backupid;
   $scope.photos = $http.get(apiPhotos).then(function (response) {   // http shorthand function
      // $log.info(response);
      $scope.photos = response.data;                  // store data in scoped var
      var topUsername = "";                           // store the top user for side bar display
      $scope.topUser = "";
      var topLike = 0;                                // var to store max likes from gathered photos
      // loop through photos and store the user who has the photo with the highest likes
      // on the page
      angular.forEach($scope.photos, function (photo, key) {
         // $log.info($scope.photos[key]);                     // log info for testing
         if($scope.photos[key].likes >= topLike){
            topLike = $scope.photos[key].likes;
            topUsername = $scope.photos[key].user.username;
            $scope.topUser = $scope.photos[key].user           // store top user
         }
      });
      // $log.info($scope.topUser);                            // log info for testing
      // second api call to gather the users top 3 photos from their profile page
      var topUserApi = "https://api.unsplash.com/users/" + topUsername + "/photos?per_page=3&order_by=popular&" + backupid;
      $scope.topUserPhotos = $http.get(topUserApi).then(function (response) {
         $log.info(response);
         $scope.topUserPhotos = response.data;
      });
      // if api call is unsuccessful throw and error and log it
   }, function (reason) {
      $scope.error = reason.data;
      $log.info(reason);
   });
}]);

// bootstrap dynamic sidebar where the top user will go
$("#sidebar").mCustomScrollbar({
         theme: "minimal"
    });
    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('active');
    });
