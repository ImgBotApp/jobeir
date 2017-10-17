import React from 'react';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmailRow from '../modules/EmailRow';

export default props => (
  <Layout>
    <Header />
    <Body>
      <EmailRow width="100%" fontSize="32px" fontWeight="600">
        Hi, {props.options.user.firstName}
      </EmailRow>
      <EmailRow>Welcome to Jobeir!</EmailRow>
      <EmailRow>
        Our goal is to create the best job board for the tech industry. We are
        continuously working on creating the leading platform on the web. We're
        so happy you decided to join our journey.
      </EmailRow>
      <EmailRow>
        How to post a job
        <br />
        <ol>
          <li>Create a new company</li>
          <li>Create a job posting</li>
        </ol>
      </EmailRow>

      <EmailRow>
        Thanks,
        <div>Jobeir</div>
      </EmailRow>
    </Body>
    <Footer />
  </Layout>
);
