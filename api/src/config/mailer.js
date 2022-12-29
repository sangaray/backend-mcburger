const nodemailer = require("nodemailer");
const { MAIL, MAIL_PASSWORD} = process.env;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAIL, // generated ethereal user
    pass: MAIL_PASSWORD, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready por send emails.");
});

module.exports = { transporter };
