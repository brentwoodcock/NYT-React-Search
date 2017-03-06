var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedArticleSchema = new Schema({
  title: {
    type: String
  },
  published: {
    type: Date
  },
  url: {
  	type: String
  }
});

var SavedArticles = mongoose.model("History", SavedArticleSchema);
module.exports = SavedArticles;