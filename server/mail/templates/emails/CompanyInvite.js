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
      <EmailRow>
        You've been invited to join {props.options.company.displayName}
      </EmailRow>
      <EmailRow>
        If you don't want to join {props.options.company.displayName} please
        ignore this email.
      </EmailRow>
      <EmailRow>
        <EmailButton
          link={props.options.resetUrl}
          text="Click here to accept your invite"
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
