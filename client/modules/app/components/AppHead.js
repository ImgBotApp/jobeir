import React from 'react';
import Helmet from 'react-helmet';

const AppHead = () => (
  <Helmet
    title="Gost"
    titleTemplate="%s - Top Secret"
    meta={[
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ]}
  />
);

export default AppHead;
