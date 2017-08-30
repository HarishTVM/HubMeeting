var express = require('express');

var app = express.Router();

app.get("/",function(req, res){
  res.render("login");
});

app.get("/meeting",function(req, res){
  res.render("meeting");
});

app.get("/newMeeting", function(req, res){
  res.render("newMeeting");
});

module.exports = app;