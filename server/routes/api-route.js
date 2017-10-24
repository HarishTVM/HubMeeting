#!/usr/bin/env node
"strict mode";
"esversion:6";

var express = require('express');

var app = express.Router();

app.get("/", (req, res)=>{
  res.render("login", {year: new Date().getFullYear()});
});
app.get("/meeting", (req, res)=>{
  res.render("meeting", {year: new Date().getFullYear()});
});
app.get("/newmeeting", (req, res)=>{
  res.render("newmeeting",{year: new Date().getFullYear()});
});
app.get("/configure", (req, res)=>{
  res.render("configure", {year: new Date().getFullYear()});
});
app.get("/changePassword", (req, res)=>{
  res.render("changepassword", {year: new Date().getFullYear()});
});
app.get("/activitylist", (req, res)=>{
  res.render("activitylist", {year: new Date().getFullYear()});
});
app.get("/users", (req, res)=>{
  res.render("users", {year: new Date().getFullYear()});
});
app.get("/createspace",(req,res)=>{
 res.render("createspace", {year: new Date().getFullYear()});
});
app.get("/updatespace", (req, res)=>{
  res.render("updatespace", {year: new Date().getFullYear()});
});
app.get("/settings",(req,res)=>{
  res.render("settings", {year: new Date().getFullYear()});
});
app.get("/dashboard",(req,res)=>{
  res.render("dashboard", {year: new Date().getFullYear()});
});
app.get("/smtp",(req,res)=>{
  res.render("smtp", {year: new Date().getFullYear()});
});
app.get("/login", (req, res)=>{
  res.render("login", {year: new Date().getFullYear()});
});
app.get("/onhovermeeting", (req, res)=>{
  res.render("onhovermeeting", {year: new Date().getFullYear()});
});
app.get("/404page", (req, res)=>{
  res.render("404page", {year: new Date().getFullYear()});
});
app.get("/logs",(req,res)=>{
  res.render("logs", {year: new Date().getFullYear()});
});
app.get("/spacelist", (req, res)=>{
  res.render("spacelist", {year: new Date().getFullYear()});
});

module.exports = app;
