/**
 * Boilerplate code to access modules
 */
const express = require("express");
const app = express();
const server = require("http").Server(app);
const session = require('express-session');
const cors = require("cors")
require("dotenv").config();

// Initialized DB using an exported module from another file
require("./initDB")();

const ONE_DAY = 1000 * 60 * 60 * 24;

// Session Setup
app.use(cors())
app.use(
	session({
		secret: "hvlhjlakdjnclkasjnvjkadfaksdfcnvlchwjjdndsjsjjsj",
		name: "BuddyUpSession",
		resave: false,
		cookie: {
			maxAge: ONE_DAY,
		},
		saveUninitialized: true,
	})
);
app.use(express.json())

// Access routers
const indexRouter = require("./Routes/index");

// Server routes
app.use("/", indexRouter);

// Run server
let port = process.env.PORT || 8000;
server.listen(port, function () {
	console.log("Listening on port " + port + "!");
});
