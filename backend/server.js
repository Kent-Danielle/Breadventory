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

const HALF_DAY = 43200000;

// Session Setup
app.use(cors())
app.use(
	session({
		secret: "hvlhjlakdjnclkasjnvjkadfaksdfcnvlchwjjdndsjsjjsj",
		name: "LFMSession",
		resave: false,
		cookie: {
			maxAge: HALF_DAY,
		},
		saveUninitialized: true,
	})
);
app.use(express.json())

// Access routers
const indexRouter = require("./Routes/index");
const dataRouter = require("./Routes/data");

// Server routes
app.use("/", indexRouter);
app.use("/data", dataRouter);

// Run server
let port = process.env.PORT || 8000;
server.listen(port, function () {
	console.log("Listening on port " + port + "!");
});
