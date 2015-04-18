var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));

app.post("/inbound", function(req,res) {
  var event = JSON.parse(req.body.mandrill_events);
  var summary = {
    text: event.text,
    fromemail: event.from_email,
    fromname: event.from_name,
    subject: event.subject
  };
  console.log(summary);
  res.end();
});

app.listen(4000, function() {console.log("listening emails on port 4000");});