import React from 'react';
import Link from 'react-router/lib/Link';

const Home = () =>
  <div>
    <div>Home</div>
    <Link to='/login'>Login</Link> 
    <Link to='/signup'>Signup</Link> 
  </div>;

export default Home;