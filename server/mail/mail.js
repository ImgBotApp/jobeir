import nodemailer from 'nodemailer';
import mailConfig from './config';
import React from 'react';

import Oy from 'oy-vey';

import HelloWorldEmail from './templates/emails/HelloWorld';

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

export function send(options) {
  const html = Oy.renderTemplate(<HelloWorldEmail />, {
    title: 'This is an example',
    previewText: options.resetUrl
  });

  const mailOptions = {
    from: `Dennis Brotzky <noreply@brotzky.co`,
    subject: options.user.subject,
    to: options.user.email,
    html,
    text: options.resetUrl
  };

  return transport.sendMail(mailOptions);
}

// export const send = () => {
//   transport.sendMail({
//     from: 'Dennis Brotzky <brotzky@gmail.com>',
//     to: 'brotzky@gmail.com',
//     subject: 'Hello, world',
//     html: '<stonrg>Hello, world<strong>',
//     text: 'Hello, world'
//   });
// };
