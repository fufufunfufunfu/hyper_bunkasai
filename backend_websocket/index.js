require("dotenv").config();
const express = require("express");
const http = require('http')
const url = require('url')
const WebSocket = require('ws')

// init express app
const app = express();

// CORS settings
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function(message) {
     wss.broadcast(message);
  })
})

wss.broadcast = function(msg) {
 console.log(msg);
 wss.clients.forEach(function each(client) {
     client.send(msg);
  });
};

server.listen(8080)

