import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const CompanyOnboarding = props => {
  return (
    <div>
      This is the onboarding message
      <Link to="/create/company/about">Agree</Link>
    </div>
  );
};

export default CompanyOnboarding;
