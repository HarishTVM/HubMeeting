#!/usr/bin/env node
"strict mode";
"esversion:6";

var express = require('express');

var app = express.Router();

app.get("/", (req, res)=>{
  res.render("login");
});
app.get("/meeting", (req, res)=>{
  res.render("meeting");
});
app.get("/newMeeting", (req, res)=>{
  res.render("newMeeting");
});
app.get("/configure", (req, res)=>{
  res.render("configure");
});
app.get("/changePassword", (req, res)=>{
  res.render("changepassword");
});
app.get("/activity", (req, res)=>{
  res.render("activity");
});
module.exports = app;