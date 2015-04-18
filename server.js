var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var secrets = require('./secrets.json');

var transporter = nodemailer.createTransport(smtpTransport({
  host: "smtp.mandrillapp.com",
  port: 587,
  auth: secrets.mandrill
}));

var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));

app.post("/inbound", function(req,res) {
  try {
    var msgarray = JSON.parse(req.body.mandrill_events);
    console.log(msgarray);
    console.log("1");
    var msg0 = msgarray[0].msg;
    console.log(msg0);
    console.log("2");
    try {
      var summary = {
        text: msg0.text,
        fromemail: msg0.from_email,
        fromname: msg0.from_name,
        subject: msg0.subject
      };
      console.log(summary);
      var mailOptions = {
        from: summary.fromname + " <"+summary.fromemail+">",
        to: 'griffithse@gmail.com',
        subject: summary.subject,
        text: summary.text
      };
      transporter.sendMail(mailOptions, function(err,info) {
        if (err) {
          console.log("sendMail error: "+err);
        } else {
          console.log("sent: "+info.response);
        }
      });
    } catch (e) {
      console.log("parseerror 1: "+e);
    }
  } catch (e) {
    console.log("error: "+e);
  }
  res.end();
});

app.listen(4000, function() {console.log("listening for emails on port 4000");});