import nodemailer from 'nodemailer';
import mailConfig from './config';

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

export const send = () => {
  transport.sendMail({
    from: 'Dennis Brotzky <brotzky@gmail.com>',
    to: 'brotzky@gmail.com',
    subject: 'Hello, world',
    html: '<stonrg>Hello, world<strong>',
    text: 'Hello, world'
  });
};
