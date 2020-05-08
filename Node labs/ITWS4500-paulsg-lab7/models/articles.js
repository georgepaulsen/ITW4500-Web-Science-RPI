// article model for mongo database
const mongoose = require('mongoose');

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
// let Article = mongoose.model('articles', articleSchema);
mongoose.model('articles', articleSchema);
