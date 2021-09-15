//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;



const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});




const User = mongoose.model("User", userSchema);



app.get("/", function(req, res){
  res.render("home");
});
app.get("/login", function(req, res){
  res.render("login");
});
app.get("/register", function(req, res){
  res.render("register");
});
//TODO
app.post("/register", function(req, res){

  const newUser = new User({
    email : req.body.username,
    password : bcrypt.hashSync(req.body.password, saltRounds)

  });
  newUser.save(function(err){
    if(err){console.log(err);}
    else{res.render("secrets");
  }
});
});
app.post("/login", function(req, res){
  User.findOne({email : req.body.username, password : bcrypt.hashSync(req.body.password, saltRounds)}, function(err){
    if(err){console.log(err);}
    else{res.render("secrets");}
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
