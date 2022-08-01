const express = require('express')

const app = express();
const server = require('http').Server(app);

require('dotenv').config();

require("./initDB")()

// RUN SERVER
let port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log('Listening on port ' + port + '!');
});