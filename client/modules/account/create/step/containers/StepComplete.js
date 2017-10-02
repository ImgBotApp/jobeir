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
        Congratulations {params.create}
        <div>
          <Link to={`/create/job/about/${params.companyId}`}>C</Link>
        </div>
        <div>
          <Link to="/account/jobs/">Dashboard</Link>
        </div>
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
