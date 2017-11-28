#!/usr/bin/env node
"esversion 6";
"strict mode";

module.exports.users = (req, res) => {
    res.render("users", { year: new Date().getFullYear() });
};