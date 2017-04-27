import React from 'react';
import Helmet from 'react-helmet';
import Link from 'react-router/lib/Link';

const NotFound = () => (
  <div>
    <Helmet title="Not Found" />
    <h1>Page Not Found</h1>
    <Link to="/">Return Home</Link>
  </div>
);

export default NotFound;
