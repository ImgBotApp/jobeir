import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import UserWrapper from '../../../user/containers/UserWrapper';

const StepComplete = props => {
  const { params } = props;

  return (
    <StepCompleteContainer>
      Congratulations {params.create}
      <div>
        <Link to={`/create/job/about/${params.companyId}`}>Create a job</Link>
      </div>
      <div>
        <Link to="/account/dashboard/">Dashboard</Link>
      </div>
    </StepCompleteContainer>
  );
};

export default UserWrapper(StepComplete);

const StepCompleteContainer = styled.div`
  max-width: 1280px;
  margin: 50px auto 0;
`;
