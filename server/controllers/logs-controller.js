#!/usr/bin/env node
"esversion 6";
"strict mode";

module.exports.logs = (req, res) => {
    res.render("logs", { year: new Date().getFullYear() });
};