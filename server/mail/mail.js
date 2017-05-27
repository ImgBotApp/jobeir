import nodemailer from 'nodemailer';
import mailConfig from './config';
import React from 'react';

import Oy from 'oy-vey';

import PasswordReset from './templates/emails/PasswordReset';

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

export function send(options) {
  const html = Oy.renderTemplate(<PasswordReset options={options} />, {
    title: 'Password Reset',
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
