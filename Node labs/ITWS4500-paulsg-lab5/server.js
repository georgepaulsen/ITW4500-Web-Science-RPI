// Martin Paulsen Lab 5
// server file
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/lab5db';
const json2csv = require('json2csv').parse;


// connect to mongodb via mongoose
mongoose.connect(url, {
   useUnifiedTopology: true,
   useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// define the database schema for entry
let articleSchema = new mongoose.Schema({
   source: { name: String },
   author: String,
   title: String,
   description: String,
   urlToImage: String,
   url: String
});
// define the collection
let Article = mongoose.model('articles', articleSchema);


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

// express serve all the static webpages and js files
app.use(express.static('public'));
// server route handler push page to index
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});


// search button was clicked fires get reqest for this page where
// the api call will be made and mongo will be populated
app.get('/populateDB/:keyW', function(req, res) { // :keyW is param passed in by the search bar
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
      Article.insertMany(news.articles, function(err, docs) {});
   });
   console.log('server msg: Collection populated with keyword ' + s_key);
   res.send('Database populated');
});


//express recieves request for this page, makes mongo call
// and populate page with data from mongo
app.get('/displayDB', function(req, res) {
   mongoose.model('articles').find(function(err, articles) {
      console.log("server msg: Collection read");
      res.send(articles);
   });
});


// route to reset the datbase, the collection is dropped
app.get('/resetDB', function(req, res) {
   // Article.collection.drop();
   mongoose.connection.db.dropCollection('articles', function(err, result) {
      if (err) return console.log(err);
      else console.log("server msg: Collection dropped")
   });
   res.send("Collection dropped");
});


// route for exporting the database
app.get('/export/:type', function(req, res) { // type is a paramater passed in from angular
   let type = req.params.type;
   const fields = ['_id', 'source.name', 'author', 'title', 'description', 'url', 'urlToImage']
   let filename = __dirname + "/paulsg-lab5." + type;

   // pull data to page with find function
   mongoose.model('articles').find(function(err, articles) {
      let rep_str;
      if (type == "json") { rep_str = JSON.stringify(articles, null, 2); }
      else { rep_str = json2csv(articles, { fields }); }

      // write to file
      fs.writeFile(filename, rep_str, (err) => {
         if (err) return console.log(err);
      });
   });
   console.log("server msg: Collection exported as " + filename);

   res.send("Collection exported");
});

// start server
app.listen(port, () => console.log(`Paulsg - Lab 5 on port ${port}`));
