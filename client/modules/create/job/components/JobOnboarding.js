import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const JobOnboarding = props => {
  return (
    <div>
      This is the onboarding message
      <Link to="/create/job/about">Agree</Link>
    </div>
  );
};

export default JobOnboarding;
