#!/usr/bin/env node
"strict mode";
"esversion:6";
/*jshint esversion: 6 */

var express = require("express");
var cluster = require('cluster');
var session = require('express-session');
var routes = require('./server/routes/api-route');
var io = require("./server/helpers/io-helper");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('./server/helpers/utility').logger;
var config = require("./server/web-config");
var path = require("path");
var i18n = require("i18n-express");
var sslPort = 443; // Default port for HTTPS
const osLocale = require('os-locale');
var localLang = null;
localLang = osLocale.sync().toString();

	var xmpp = require('simple-xmpp');
	var dns = require('dns');

	xmpp.on('online', function(data) {
		console.log('Connected with JID: ' + data.jid.user);
		console.log('Yes, I\'m connected!');
	});

	xmpp.on('chat', function(from, message) {
		xmpp.send(from, 'echo: ' + message);
	});

	xmpp.on('error', function(err) {
		console.error(err);
	});

	xmpp.on('subscribe', function(from) {
	if (from === 'a.friend@gmail.com') {
		xmpp.acceptSubscription(from);
		}
	});

	xmpp.connect({
			jid		: "naveen@inflexion.com",
			password: "Pass1234",
			host	: 'core1.inflexion.com',
			port	: 5222
	});

	dns.resolveSrv("_xmpp-server._tcp.inflexion.com", function(err,data){
		console.log(err);
		console.log(data);
	})
/******---------------------------------------------- BEGIN Creation Of Server Properties --------------------------------------------------------------------------------------***/
	// Create express application
	var app = module.exports = express();
	process.env.NODE_ENV = 'production';

	app.set('views', __dirname + '/view');
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);

	app.set('trust proxy', 1);
	//app.use(session(config.serverSettings.sessionAttr));
	app.use(bodyParser.json({limit: '5mb'}));
	app.use(bodyParser.urlencoded({extended:true,limit: '5mb'}));
	app.use(cookieParser());

	if(config.app.supportedLangs.indexOf(localLang) < 0)
		localLang = "en"		

	app.use(i18n({
		translationsPath: path.join(__dirname, 'translations'),
		cookieLangName : "ulang",
		paramLangName : "lang",
		defaultLang : localLang,
		browserEnable : false,
		siteLangs: config.app.supportedLangs,
		textsVarName: 'translation'
	}));

	// Configure static files path
	/*BEGIN Configuration for static pages*/
	app.use('/scripts',express.static('scripts'));
	app.use('/styles',express.static('styles'));
    app.use('/view',express.static('view'));
	app.use('/images',express.static('images'));
	app.use('/fonts',express.static('fonts'));
	app.use('/node_modules',express.static('node_modules'));
    app.use('/site-config.js',express.static('site-config.js'));
	/*END Configuration for static pages*/

    app.use('/favicon.ioc',express.static('images/favicon.ioc'));

	//Set headers for all incoming requests
	app.all('/*', (request, response, next)=>{
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Key');
		response.header('Access-Control-Expose-Headers','*');
		response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, HEAD');
		response.header('Access-Control-Allow-Credentials', 'true');
		response.header('Access-Control-Max-Age', '1209600');
		next();
	});

	// Access the session as req.session
	// app.get('/api/*', function(req, res, next) {
	//   if (!req.session.user_id)
	// 	  res.sendStatus(401).send();
	// })

    app.use('/', routes);
    console.log("Routes are OK");


/******---------------------------------------------- END Creation Of Server Properties --------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN server start --------------------------------------------------------------------------------------***/
	if (cluster.isMaster)
	{
	  	// Count the machine's CPUs
	    var CPUcount = require('os').cpus().length;
	    for(var i=0; i<CPUcount; i++)  // Create a worker for each CPU
	    	  cluster.fork();
	}
	else
	{
		// Server starts listening!!
		if(config.app.enableSSL)
		{
		  config.app.httpsCert.key = io.fileReadSync(config.app.httpsCert.key);
		  config.app.httpsCert.cert = io.fileReadSync(config.app.httpsCert.cert);
		  https.createServer(config.app.httpsCert,app).listen(sslPort);
		  if(config.app.appStage)
			  console.log('CMS Backend services are started!!! Running on %d', sslPort);
		}
		else
		{
		  app.listen(config.app.port);
		  if(config.app.appStage)
			  console.log('CMS Backend services are started!!! Running on %d',config.app.port);
		}

		// Error handler
		app.use((err, req, res, next)=>{
			if(config.app.appStage)
				console.error("::::::::::::::::::::::::::::::: Seviour Error ::::::::::::::::::::::::::::: \n"+err.stack);

			logger.log('error', 'Seviour Error::::: ErrorMessage : %s,::::: ErrorStack : %s,::::: ErrorNumber : %s', err.message, err.stack, err.errno);
		    res.status(500);
		    res.end(err.message);
			setTimeout(()=>{
				process.exit(1);
			},70);
		});
	}
	cluster.on('exit',(worker)=> 	// Listen for dying workers
	{
		if(config.app.appStage)
		{
			console.log("Worker with ID "+worker.id+" died :(");
	 	    console.info("\n:::::::::::: Server Restarting ::::::::::::\n");
	 	}
	    cluster.fork();	    // Replace the dead worker,
	});
/******---------------------------------------------- END server start --------------------------------------------------------------------------------------***/
