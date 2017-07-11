import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateUser } from '../../../user/ducks';

const agreeToValues = props => {
  const { dispatch, user } = props;
  const data = { agreedToValues: true };

  dispatch(updateUser(user._id, data, '/create/company/about'));
};

const CompanyOnboarding = props => {
  return (
    <div>
      <Header>Our values</Header>
      <Text>
        At -company name- we believe in equal opportunity employment and no
        discrimination against any applicants.
      </Text>
      <Text>
        By continuing you agree to not to discriminate against any job applicant
        because of race, color, religion, national origin, sex, physical or
        mental disability, or age
      </Text>
      <AgreeLink onClick={() => agreeToValues(props)}>I Agree</AgreeLink>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(CompanyOnboarding);

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const AgreeLink = styled.div`
  height: 50px;
  border-radius: 3px;
  outline: none;
  border: none;
  background: #5c6ac4;
  width: 100%;
  max-width: 200px;
  font-size: 18px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;
