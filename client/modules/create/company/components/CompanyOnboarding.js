import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { SubmitButton } from '../../../user-input/inputs/input';

const CompanyOnboarding = props => {
  return (
    <div>
      <Header>Our values</Header>
      <Text>
        At -company name- we believe in equal oppotunity employment and no discrimination against any applicants.
      </Text>
      <Text>
        By continuing you agree to not to discriminate against any job applicant because of race, color, religion, national origin, sex, physical or mental disability, or age
      </Text>
      <AgreeLink to="/create/company/about">Agree</AgreeLink>
    </div>
  );
};

export default CompanyOnboarding;

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const AgreeLink = styled(Link)`
  height: 50px;
  border-radius: 3px;
  outline: none;
  border: none;
  background: #fb5032;
  width: 100%;
  max-width: 200px;
  font-size: 18px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
