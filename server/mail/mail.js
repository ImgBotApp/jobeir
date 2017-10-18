import React from 'react';
import Oy from 'oy-vey';
import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import mailConfig from './config';
import * as emails from './templates/emails/';

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass
  }
});

export function send(options) {
  const EmailTemplate = emails[options.template];
  const html = Oy.renderTemplate(<EmailTemplate options={options} />, {
    title: options.subject,
    previewText: options.subject
  });
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `Dennis Brotzky <noreply@jobeir.com`,
    subject: options.subject,
    to: options.user.email,
    html,
    text
  };

  return transport.sendMail(mailOptions);
}
