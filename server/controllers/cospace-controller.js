#!/usr/bin/env node
"esversion 6";
"strict mode";

module.exports.createspace = (req, res) => {
    res.render("createspace", { year: new Date().getFullYear() });
};

module.exports.updatespace = (req, res) => {
    res.render("createspace", { year: new Date().getFullYear() });
};

module.exports.spacelist = (req, res) => {
    res.render("spacelist", { year: new Date().getFullYear() });
};