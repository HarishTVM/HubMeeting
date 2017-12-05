#! /bin/env node
"esversion 6";
"strict mode";

const baseController = require('./base-controller');

module.exports.login = (req, res) => {
    res.render("login", { year: new Date().getFullYear() });
    console.log(req.cookies);
    console.log("=========================");
    console.log(req.session);    
};

module.exports.dashboard = (req, res) => {
    res.render("dashboard", { year: new Date().getFullYear() });
};

module.exports.pagenotfound = (req, res) => {
    res.render("404page", { year: new Date().getFullYear() });
};