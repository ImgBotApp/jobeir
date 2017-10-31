// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateUser } from '../../../../user/ducks';

const agreeToValues = (props: {
  dispatch: Function,
  user: { _id: string }
}) => {
  const { dispatch, user } = props;
  const data: { agreedToValues: boolean } = { agreedToValues: true };

  dispatch(updateUser(user._id, data, '/create/company/about'));
};

const CompanyOnboarding = props => (
  <div>
    <Header>Create a job</Header>
    <List>
      <ListItem>
        <ListNumber>1</ListNumber> Create a company
      </ListItem>
      <ListItem>
        <ListNumber>2</ListNumber> Create jobs
      </ListItem>
      <ListItem>
        <ListNumber>3</ListNumber> Publish jobs
      </ListItem>
    </List>
    <Header>Posting policy</Header>
    <Text>
      At Jobeir we believe in equal opportunity employment and no discrimination
      against any applicants.
    </Text>
    <Text>
      By continuing you agree to not to discriminate against any job applicant
      because of race, color, religion, national origin, sex, physical or mental
      disability, or age
    </Text>
    <AgreeLink onClick={() => agreeToValues(props)}>I Agree</AgreeLink>
  </div>
);

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(CompanyOnboarding);

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 800;
`;

const Text = styled.p`
  font-size: 20px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;
const List = styled.ul`
  font-size: 20px;
  line-height: 1.6;
  list-style: none;
  margin: 20px auto 50px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.6;
  margin-bottom: 15px;
  font-weight: 600;
`;

const AgreeLink = styled.div`
  height: 50px;
  border-radius: 3px;
  outline: none;
  border: none;
  background: #5c6ac4;
  width: 100%;
  max-width: 180px;
  font-size: 18px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const ListNumber = styled.div`
  border: 2px solid ${props => props.theme.colors.purple};
  height: 44px;
  width: 44px;
  color: ${props => props.theme.colors.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  border-radius: 50%;
  padding: 7px 0px 3px 1px;
  margin-right: 20px;
`;
