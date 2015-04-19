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
    var msg0 = msgarray[0].msg;
    var mailOptions = {
      from: msg0.from_name + " <"+msg0.from_email+">",
      to: 'griffithse@gmail.com',
      subject: msg0.subject,
      text: msg0.text
    };
    transporter.sendMail(mailOptions, function(err,info) {
      if (err) {
        console.log("sendMail error: "+err);
      } else {
        console.log("sent: "+info.response);
      }
    });
  } catch (e) {
    console.log("error: "+e);
  }
  res.end();
});

app.listen(4000, function() {console.log("listening for emails on port 4000");});