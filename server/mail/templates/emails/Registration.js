import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmailButton from '../modules/EmailButton';
import EmailRow from '../modules/EmailRow';

export default props =>
  <Layout>
    <Header />
    <Body>
      <EmailRow width="100%" fontSize="32px" fontWeight="600">
        Hi, {props.options.user.firstName}
      </EmailRow>
      <EmailRow>Welcome to Company!</EmailRow>
      <EmailRow>
        Our goal is to create a platform for you to attract and hire the best
        applicants possible. If you have any comments or questions please reach
        out to us and we'll get back to you as soon as possible.
      </EmailRow>
      <EmailRow>
        How to post a job
        <br />
        <ol>
          <li>Create a new company</li>
          <li>Create a job posting</li>
          <li>Wait for your job posting to pass review</li>
        </ol>
      </EmailRow>

      <EmailRow>
        Thanks,
        <div>Company Name</div>
      </EmailRow>
    </Body>
    <Footer />
  </Layout>;
