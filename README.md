# simplemail

A basic mail forwarding app built using [express](http://expressjs.com/), [nodemailer](https://github.com/andris9/Nodemailer), and the mail service [mandrill](http://mandrill.com/).

Listens for incoming mail from mandrill on route "/inbound" on port 4000. Parses what arrives, and sends a copy to my gmail account. Currently does not handle attachments or anything fancy.
