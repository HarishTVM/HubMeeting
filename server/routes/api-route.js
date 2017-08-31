#!/usr/bin/env node
"strict mode";
"esversion:6";

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

app.get("/configure",(req, res)=>{
  res.render("configure");
});

module.exports = app;