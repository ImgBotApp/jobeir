import React from 'react';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmailRow from '../modules/EmailRow';
import EmptySpace from '../modules/EmptySpace';

export default props => (
  <Layout>
    <Header />
    <Body>
      <EmailRow width="100%" fontSize="32px" fontWeight="600">
        Hi {props.options.company.displayName},
      </EmailRow>
      <EmailRow>
        <strong>Payment confirmation</strong>
        <br />$49 USD
      </EmailRow>
      <EmailRow>
        <strong>Published job</strong> <br />
        {props.options.job.title}
      </EmailRow>
      <EmailRow>
        <strong>Authorized</strong> <br />
        {props.options.user.firstName} {props.options.user.lastName} ({props.options.user.email})
      </EmailRow>
      <EmptySpace />
      <EmailRow>
        Thank you for choosing Jobeir to help build your team!
      </EmailRow>
      <EmailRow>
        Your job listing will be activated and listed within the next 24 hours.
        Each job postings stays active for 30 days. Our goal is to help you find
        the best talent.
      </EmailRow>
      <EmailRow>
        Thanks,
        <div>Jobeir</div>
      </EmailRow>
    </Body>
    <Footer />
  </Layout>
);
