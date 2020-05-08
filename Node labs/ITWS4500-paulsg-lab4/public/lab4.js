let app = angular.module('newsApp', []);
app.controller('ctrNews', function($scope, $log, $http) {
   // api call to node for headlines
   $scope.getHead = function() {
      let query = '/api/getnews/headlines';
      $scope.news = $http.get(query).then(function(response) {
         $scope.news = response.data.articles; // store data in scoped varible
      }, function(reason) { // function does not fire log error
         $scope.error = reason.data;
         $log.info(reason);
      });
   };
   // api call to node for searched news
   $scope.getNews = function() {
      let query = "/api/getnews/" + $scope.keyW;
      $scope.apicall(query);
      $scope.news = $http.get(query).then(function(response) {
         $scope.news = response.data.articles; // store data in scoped varible
      }, function(reason) { // function does not fire log error
         $scope.error = reason.data;
         $log.info(reason);
      });
   };

   $scope.apicall = function(string) {
      $scope.news = $http.get(string).then(function(response) {
         $scope.news = response.data.articles; // store data in scoped varible
      }, function(reason) { // function does not fire log error
         $scope.error = reason.data;
         $log.info(reason);
      });
   }
});
