import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';

import StepRouter from './StepRouter';
import StepForm from './StepForm';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
const Step = props => {
  return (
    <StepContainer>
      <StepRouter>
        <StepForm params={props.params} />
      </StepRouter>
    </StepContainer>
  );
};

export default UserWrapper(Step);

const StepContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
