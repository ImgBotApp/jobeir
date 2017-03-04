import React from 'react';
import Link from 'react-router/lib/Link';

const PrimaryNavLinks = () =>
  <div>
    <Link to="/login">Log In</Link>
    <Link to="/signup">Sign Up</Link>
  </div>;

export default PrimaryNavLinks;