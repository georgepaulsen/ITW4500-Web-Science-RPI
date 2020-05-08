let app = angular.module('newsApp', ['chart.js']);

app.controller('ctrNews', ($scope, $log, $http) => {
   $scope.types = ["json", 'csv'];

   // call to node to populate database
   $scope.populateDB = () => {
      let query = '/populateDB/';   // build query
      if($scope.keyW == null) { query += "headlines"; }
      else { query += encodeURI($scope.keyW); }
      $scope.queries = $http.get(query).then().catch(err => {});
   };

   // call to node to return page with data pullled from mongo
   $scope.displayDB = () => {
      let mongo_route = "/displayDB";
      $scope.news = $http.get(mongo_route).then(response => {
         // $log.info(response.data);
         $scope.news = response.data.articles; // store data in scoped varible
         $scope.queries = response.data.queries;

         // manipulate data into the graphs
         // bar graph
         $scope.bar_labels = [];
         $scope.bar_data = [[]];
         $scope.bar_options = {title: {
             display: true,
             text: "Results vs. Query",
             fontFamily: 'Lato'
         }};

         // author distribution graph
         let temp_auths = [];
         let temp_arts = [];
         $scope.auth_labels = ['> 1 written', '<= 1 written'];
         $scope.auth_data = [0,0];
         $scope.auth_options = {title: {
             display: true,
             text: "Authors with more than 1 article vs. authors with 1 article",
             fontFamily: 'Lato'
         }};

         // doughnut graph
         $scope.donut_labels = [];
         $scope.donut_data = [];
         $scope.donut_options = { title: {
             display: true,
             text: "Source Distribution of " + (response.data.articles).length + " articles",
             fontFamily: 'Lato'
         }};

         // bar graph
         angular.forEach(response.data.queries, (q) => {
            $scope.bar_labels.push(q.query);
            $scope.bar_data[0].push(q.totalResults);
         });

         angular.forEach(response.data.articles, (a) => {
            // doughnut
            let check = $scope.donut_labels.indexOf(a.source.name);
            if (check == -1) {
               $scope.donut_labels.push(a.source.name);
               $scope.donut_data.push(1);
            } else {
               $scope.donut_data[check] = $scope.donut_data[check] + 1;
            }

            // authors
            let auth_check = temp_auths.indexOf(a.author);
            if (auth_check == -1){
               temp_auths.push(a.author);
               temp_arts.push(1);
            } else {
               temp_arts[auth_check] = temp_arts[auth_check] + 1;
            }
         });

         let i = 0;
         while(i < (response.data.articles).length){
            if (temp_arts[i] == 1) { ++$scope.auth_data[1];}
            else {++$scope.auth_data[0];}
            ++i;
            // $log.info($scope.auth_data);
         }
          // $log.info("labels:", $scope.auth_labels);
          // $log.info("...");
          // $log.info("chart data:", $scope.auth_data);
      }, reason => { // function does not fire log error
         $scope.error = reason.data;
         $log.info(reason);
      });
   };

   // reset db by making request to node which will run mongoose
   $scope.resetDB = () => {
      let mongo_drop = '/resetDB';
      $http.get(mongo_drop).then().catch(err => {});
   };

   // exporting the database vis csv or json format, if no filetype
   // is selected the default type is json
   $scope.exportDB = () => {
      let t = $scope.selectedType;
      if (t) $http.get('/export/' + t).then().catch(err => {});
      else  $http.get('/export/json').then().catch(err => {});
   };
});
