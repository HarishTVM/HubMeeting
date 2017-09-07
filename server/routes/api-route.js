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
app.get("/newmeeting", (req, res)=>{
  res.render("newmeeting");
});
app.get("/configure", (req, res)=>{
  res.render("configure");
});
app.get("/changePassword", (req, res)=>{
  res.render("changepassword");
});
app.get("/activitylist", (req, res)=>{
  res.render("activitylist");
});
app.get("/users", (req, res)=>{
  res.render("users");
});
app.get("/sapacelist", (req, res)=>{
  res.render("sapacelist");
});

module.exports = app;