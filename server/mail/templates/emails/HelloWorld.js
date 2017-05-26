import React from 'react';

import Layout from '../layouts/Layout';

import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';

export default React.createClass({
  render: function() {
    return (
      <Layout>
        <Header color="#134ac0" />
        <Body>
          Hey there, hope you’re finding Oy useful!
        </Body>
        <Footer color="#134ac0" />
      </Layout>
    );
  }
});
