let app = angular.module('newsApp', []);

app.controller('ctrNews', function($scope, $log, $http) {
   $scope.types = ["json", 'csv'];

   // call to node to populate database
   $scope.populateDB = function() {
      let query = '/populateDB/';   // build query
      if($scope.keyW == null) { query += "headlines"; }
      else { query += $scope.keyW; }
      $http.get(query).then().catch(err => {});
   };

   // call to node to return page with data pullled from mongo
   $scope.displayDB = function() {
      let mongo_route = "/displayDB";
      $scope.news = $http.get(mongo_route).then(function(response) {
         $scope.news = response.data; // store data in scoped varible
      }, function(reason) { // function does not fire log error
         $scope.error = reason.data;
         $log.info(reason);
      });
   };

   // reset db by making request to node which will run mongoose
   $scope.resetDB = function () {
      let mongo_drop = '/resetDB';
      $http.get(mongo_drop).then().catch(err => {});
   };

   // exporting the database vis csv or json format, if no filetype
   // is selected the default type is json
   $scope.exportDB = function () {
      let t = $scope.selectedType;
      if (t) $http.get('/export/' + t).then().catch(err => {});
      else  $http.get('/export/json').then().catch(err => {});
   };
});
