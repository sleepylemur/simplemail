var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));

app.post("/inbound", function(req,res) {
  console.log(req.body);
  res.end();
});