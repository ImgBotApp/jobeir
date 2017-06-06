import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import UserWrapper from '../../../user/containers/UserWrapper';

const StepComplete = props => {
  const { params } = props;

  return (
    <StepCompleteContainer>
      Congratulations {params.create}
      <Link to={`/create/job/about/${params.companyId}`}>Create a job</Link>
    </StepCompleteContainer>
  );
};

export default UserWrapper(StepComplete);

const StepCompleteContainer = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 50px auto 0;
`;
