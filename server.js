var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));

app.post("/inbound", function(req,res) {
  try {
    console.log("1111111111111");
    console.log(req.body.mandrill_events);
    console.log("2222222222222");
    try {
      console.log(JSON.parse(req.body.mandrill_events));
    } catch (e) {
      console.log("parseerror 1: "+e);
    }
    console.log(req.body.mandrill_events[0]);
    try {
      var event = JSON.parse(req.body.mandrill_events[0]);
    } catch (err) {
      console.log("parse error: "+err);
    }
    console.log("3333333333333");
    console.log(event);
    var summary = {
      text: event.text,
      fromemail: event.from_email,
      fromname: event.from_name,
      subject: event.subject
    };
    console.log(summary);
  } catch (e) {
    console.log("error: "+e);
  }
  res.end();
});

app.listen(4000, function() {console.log("listening emails on port 4000");});