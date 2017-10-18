import React from 'react';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmailButton from '../modules/EmailButton';
import EmailRow from '../modules/EmailRow';

export default props => (
  <Layout>
    <Header />
    <Body>
      <EmailRow width="100%" fontSize="32px" fontWeight="600">
        Hi, {props.options.user.firstName}
      </EmailRow>
      <EmailRow>We’ve received a request to reset your password.</EmailRow>
      <EmailRow>
        If you didn’t make the request, just ignore this message. Otherwise, you
        can reset your password using this link:
      </EmailRow>
      <EmailRow>
        <EmailButton
          link={props.options.resetUrl}
          text="Click here to reset your password"
        />
      </EmailRow>
      <EmailRow>
        Thanks,
        <div>Jobeir</div>
      </EmailRow>
    </Body>
    <Footer />
  </Layout>
);
