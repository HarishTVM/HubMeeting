#!/usr/bin/env node
"strict mode";
"esversion:6";

const express = require('express');
const ioHelper = require('../helpers/io-helper.js');
const cmsApiController = require('../controllers/cms-api-controller');
const userController = require('../controllers/user-controller');
const configurationController = require('../controllers/configuration-controller');
const meetingController = require('../controllers/meeting-controller');
const logsController = require('../controllers/logs-controller');
const activityController = require('../controllers/activity-controller');
const cospaceController = require('../controllers/cospace-controller');

var app = express.Router();

// LOGIN RELATED API
app.get("/", cmsApiController.login);

// DASHBOARD RELATED API
app.get("/dashboard", cmsApiController.dashboard);

// PAGE NOT FOUND RELATED API
app.get("/404page", cmsApiController.pagenotfound);

// MEETING RELATED API
app.get("/meeting", meetingController.meeting);
app.get("/newmeeting", meetingController.newmeeting);
app.get("/updatemeeting", meetingController.updatemeeting);
app.get("/schedulemeeting", meetingController.schedulemeeting);
app.get("/active-meeting", meetingController.activemeeting);

// CONFIGURATION RELATED API
app.get("/configure", configurationController.configure);
app.get("/configure-settings", configurationController.configuresettings);
app.get("/changePassword", configurationController.changepassword);
app.get("/settings", configurationController.settings);
app.get("/smtp", configurationController.smtp);
app.get("/smtp-settings", configurationController.smtpsettings);

// ACTIVITY RELATED API
app.get("/activitylist", activityController.activitylist);
app.get("/updateactivitymeeting", activityController.activitynewmeeting);

// USERS RELATED API
app.get("/users", userController.users);

// COSPACE RELATED API
app.get("/createspace", cospaceController.createspace);
app.get("/updatespace", cospaceController.updatespace);
app.get("/spacelist", cospaceController.spacelist);

// LOGS RELATED API
app.get("/logs", logsController.logs);

module.exports = app;
