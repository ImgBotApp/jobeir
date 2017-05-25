import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transport.sendMail({
  from: 'Dennis Brotzky <brotzky@gmail.com>',
  to: 'brotzky@gmail.com',
  subject: 'Hello, world',
  html: '<stonrg>Hello, world<strong>',
  text: 'Hello, world',
});
