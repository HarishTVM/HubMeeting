#!/usr/bin/env node
"esversion 6";
"strict mode";

const baseController = require('./base-controller');

module.exports.configure = (req, res) => {
    res.render("configure", { year: new Date().getFullYear() });
};

module.exports.configuresettings = (req, res) => {
    res.render("configure", { year: new Date().getFullYear() });
}

module.exports.changepassword = (req, res) => {
    res.render("changepassword", { year: new Date().getFullYear() });
};

module.exports.settings = (req, res) => {
    res.render("settings", { year: new Date().getFullYear() });
};

module.exports.smtp = (req, res) => {
    res.render("smtp", { year: new Date().getFullYear() });
};

module.exports.smtpsettings = (req, res) => {
    res.render("smtp", { year: new Date().getFullYear() });
};