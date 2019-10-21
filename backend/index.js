const express = require("express");
const app = express();

const server = app.listen(8080, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

const list = [
  {
    id: 1,
    name: "taro"
  },
  {
    id: 2,
    name: "jiro"
  }
];

app.get("/api/user/list", function(req, res, next) {
  res.json(list);
  console.log("accessed");
});
