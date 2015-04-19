var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var secrets = require('./secrets.json');

// set up transporter to send email via mandrill's smtp server
var transporter = nodemailer.createTransport(smtpTransport({
  host: "smtp.mandrillapp.com",
  port: 587,
  auth: secrets.mandrill
}));

// set up express
var app = express();
app.use(bodyParser.urlencoded({extended: true, limit: 26214400}));


// listen for emails on route /inbound
app.post("/inbound", function(req,res) {

  // use try just in case, so something unexpected doesn't take down the server
  try {

    // parse the incoming email that mandrill forwarded us
    var msgarray = JSON.parse(req.body.mandrill_events);
    var msg0 = msgarray[0].msg;

    // create mailOptions object for sending mail back to my gmail account
    var mailOptions = {
      from: msg0.from_name + " <"+msg0.from_email+">",
      to: 'griffithse@gmail.com',
      subject: msg0.subject,
      text: msg0.text
    };

    // send the message with our transporter
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

  // send ok message back to mandrill so they know the email was received
  res.end();
});

// start up server
app.listen(4000, function() {console.log("listening for emails on port 4000");});