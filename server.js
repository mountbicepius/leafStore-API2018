/*
  * Created by Anirudh Srivastav
  * API module for Online Store Microservice Framework
  *
*/
//Purpose is to build a reusable API that can be implemented via NodeJS
var express = require('express');
var http = require('http');
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var port = process.env.PORT || 22015;
var mongoose = require('mongoose');
var config =require('./config.js');
var User   = require('./models/user');
var morgan = require('morgan');
// connect to database
// Initialize the app with a service account, granting admin privileges
mongoose.connect(config.database,{
        useNewUrlParser: false
      });
app.listen(port);
app.set('appSecret', config.secret);
console.log('Hello! The API is at http://localhost:' + port + '/api');
//body-parser to fecth requests in JSON
app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(express.static('public'));
      // use morgan to log requests to the console
      app.use(morgan('dev'));
var admin = express.Router();
app.get('/', function(req,res){
  //create admin User
          var adminUser = new User({
            name: 'admin',
            password: 'pass1234',
            admin: true
          });
          try{
            adminUser.save(function(err){
            console.log('User saved successfully');
            //res.json({ success: true});
          });
        }
        catch (err)
        {
          console.log(err);
        }

        res.send('Hello! The API is at http://'+ process.env.HOST+':' + port + '/api')
});
app.use('/api',admin);
//only authenticated users shall utilise the API
//Middleware to authenticate an existing suer provided with userID and Password
admin.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('appSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
} });
} else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

admin.get('/', function(req,res){
  
});
