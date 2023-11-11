const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path')

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    template: "email",
    context: {
      title: "Discover, Explore, and Shop with Ease!",
      text: options.message,
      link: options.link,
      username:options.username,
    },
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendMail;
