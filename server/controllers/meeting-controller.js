#!/usr/bin/env node
"esversion 6";
"strict mode";

const baseController = require('./base-controller');

module.exports.meeting = (req, res) => {
    res.render("meeting", {year: new Date().getFullYear()});
};

module.exports.newmeeting = (req, res) => {
    res.render("newmeeting", { year: new Date().getFullYear() });
};

module.exports.updatemeeting = (req, res) => {
    res.render("newmeeting", { year: new Date().getFullYear() });
};

module.exports.schedulemeeting = (req, res) => {
    res.render("newmeeting", { year: new Date().getFullYear() }); 
};

module.exports.activemeeting = (req, res) => {
    res.render("active-meeting", { year: new Date().getFullYear() });
};