#!/usr.bin/env node
"esversion 6";
"strict mode";

module.exports.activitylist = (req, res) => {
    res.render("activitylist", { year: new Date().getFullYear() });
};

module.exports.activitynewmeeting = (req, res) => {
    res.render("newmeeting", { year: new Date().getFullYear() });
};