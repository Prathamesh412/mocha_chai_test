var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var logger = require('morgan');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
mongoose.connect("mongodb://localhost:27017/mocha_test");
mongoose.connection.on('error',function(){
  console.log("Mongo Error in connection");
});

var homeController = require('./controller/home');
var pageController = require('./controller/page')


// Routes Generated Below

//app.get('/',homeController.getHome);
app.get('/users/:id',homeController.getUserById);
app.get('/users',homeController.getUsers);
app.put('/user/:id',homeController.putUserById);
app.post('/user',homeController.postUser);
app.delete('/user/:id',homeController.deleteUser);

app.get('/pages',pageController.getPages);
app.get('/pages/:id',pageController.getPagesById);
app.put('/pages/:id',pageController.putPagesById);
app.post('/pages',pageController.postPage);
app.delete('/pages/:id',pageController.deletePage);
app.post('/pages/:id/addmoderator',pageController.addModerator);


app.listen('5000', function(){
  console.log("Server at port 5000");
});

module.exports = app;
