var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));

app.post("/inbound", function(req,res) {
  try {
    var msgarray = JSON.parse(req.body.mandrill_events);
    var msg0 = msgarray[0];
    try {
      var summary = {
        text: msg0.text,
        fromemail: msg0.from_email,
        fromname: msg0.from_name,
        subject: msg0.subject
      };
      console.log(summary);
    } catch (e) {
      console.log("parseerror 1: "+e);
    }
    // console.log(req.body.mandrill_events[0]);
    // try {
    //   var event = JSON.parse(req.body.mandrill_events[0]);
    // } catch (err) {
    //   console.log("parse error: "+err);
    // }
    // console.log("3333333333333");
    // console.log(event);
    // var summary = {
    //   text: event.text,
    //   fromemail: event.from_email,
    //   fromname: event.from_name,
    //   subject: event.subject
    // };
    // console.log(summary);
  } catch (e) {
    console.log("error: "+e);
  }
  res.end();
});

app.listen(4000, function() {console.log("listening emails on port 4000");});