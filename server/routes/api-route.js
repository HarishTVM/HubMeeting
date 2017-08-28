var express = require('express');

var app = express.Router();

app.get("/",function(req, res){
  res.render("login.html");
});

module.exports = app;