require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// multer configs
const storage = multer.diskStorage({
  destination: path.join(__dirname, "upload"),
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const uploadDir = multer({ storage: storage });

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
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// AWS configs
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const uploadParams = {
  Bucket: process.env.S3_BUCKET_NAME,
  Key: "",
  Body: "",
  ContentType: ""
};

// start API server
const server = app.listen(3000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

const W3CWebSocket = require("websocket").w3cwebsocket;
const ws = new W3CWebSocket("ws://websocket:8080", "echo-protocol");

ws.onerror = function() {
  console.log("Connection Error");
};

ws.onopen = function() {
  console.log("WebSocket Client Connected");
};

app.post("/photo", uploadDir.single("photo"), function(req, res, next) {
  const fileStream = fs.createReadStream(req.file.path);
  fileStream.on("error", err => {
    console.log("Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.ContentType = req.file.mimetype;
  console.log(req.file);
  uploadParams.Key = `pre/${req.file.filename}`;
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      const location = data.Location;
      console.log("Upload Success", data.Location);
      res.end();
      // res.send(`${location}`);
      const imageObj = {
        url: location,
        timestamp: Date.now()
      };
      ws.send(JSON.stringify(imageObj));
    }
  });
});
