var mongoose = require('mongoose');

var pageSchema= new mongoose.Schema({
  pagename: String,
  description: String,
  pageMod: String
});

module.exports =mongoose.model('Page',pageSchema);