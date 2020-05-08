// article model for mongo database
const mongoose = require('mongoose');

// define the database schema for entry
// quieres will hold meta data about each query
let queriesSchema = new mongoose.Schema({
   query: {type: String, unique: true },
   totalResults: Number
});

// define the queries collection
mongoose.model("queries", queriesSchema);
