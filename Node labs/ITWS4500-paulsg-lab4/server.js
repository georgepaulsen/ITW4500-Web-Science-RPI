// Martin Paulsen Lab 4
// server file
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

// get current day for api call paramater
// =======================================================================================
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let newdate = year + "-" + month + "-" + day;
if (month < 10 && day < 10) {
   newdate = year + "-" + '0' + month + "-" + '0' + day;
} else if (month < 10 && day >= 10) {
   newdate = year + "-" + '0' + month + "-" + day;
} else if (month >= 10 && day < 10) {
   newdate = year + "-" + month + "-" + '0' + day;
}
// =======================================================================================

// have express serve all the static webpages and js files
app.use(express.static('public'));

// server route handler push page to index
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});


// search button was clicked fires get reqest for this page where
// the api call will be made and the data will be written
app.get('/api/getnews/:keyW', function(req, res) { // :keyW is param passed in by the search bar
   // init variables for api call
   let accessKEY = "apiKey=bd7d9aae4fc84f289ca589f373df4315"
   let apiNews = ''
   let filename = __dirname + "/paulsg-newsapi.json";
   let s_key = req.params.keyW;
   // if user does not search anything get the top headlines
   if (s_key == 'headlines') {
      apiNews = 'http://newsapi.org/v2/top-headlines?' +
         'country=us&' + accessKEY;
   } else { // if user specifies a search term, query with the keyword with current day
      apiNews = 'http://newsapi.org/v2/everything?' +
         'q=' + s_key + '&' +
         'from=' + newdate + '&' +
         'language=en' + '&' +
         'sortBy=popularity&' + accessKEY;
   }

   // make api call using axios
   axios.get(apiNews).then(response => {
      let news = response.data;
      let rep_str = JSON.stringify(response.data, null, 2);

      // write to file
      fs.writeFile(filename, rep_str, (err) => {
         if (err) return console.log(err);
      });
      // write the data on the page to be accessed by angular script on frontend
      res.send(rep_str);
   });
});

// start server
app.listen(port, () => console.log(`Paulsg - Lab4 on port ${port}!`));
