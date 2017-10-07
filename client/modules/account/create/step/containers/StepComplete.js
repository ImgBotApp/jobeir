// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { Link } from 'react-router';
import UserWrapper from '../../../../user/containers/UserWrapper';
import StepHeader from '../components/StepHeader';

const StepComplete = (props: {
  params: { create: string, companyId: string }
}) => {
  const { params } = props;

  return (
    <StepCompleteContainer>
      <StepHeader />
      <StepCompleteContent>
        <List>
          <ListItem>
            <ListNumber complete>1</ListNumber> Agree to posting policy
          </ListItem>
          <ListItem>
            <ListNumber complete>2</ListNumber> Create a company
          </ListItem>
          <ListItem>
            <ListNumber>3</ListNumber> Create jobs
          </ListItem>
        </List>

        <StyledLink to={`/create/job/about/${params.companyId}`}>
          Continue
        </StyledLink>
      </StepCompleteContent>
    </StepCompleteContainer>
  );
};

export default UserWrapper(StepComplete);

const StepCompleteContainer = styled.div``;

const StepCompleteContent = styled.div`
  max-width: 960px;
  margin: 46px auto 0;

  @media (max-width: 1280px) {
    margin-top: 50px;
  }
`;

const List = styled.ul`
  font-size: 20px;
  line-height: 1.6;
  list-style: none;
  margin-bottom: 50px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const ListNumber = styled.div`
  border: 2px solid ${props => props.theme.colors.purple};
  height: 44px;
  width: 44px;
  color: ${props => (props.complete ? '#fff' : props.theme.colors.purple)};
  background: ${props => (props.complete ? props.theme.colors.purple : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  border-radius: 50%;
  padding: 7px 0px 3px 1px;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
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
