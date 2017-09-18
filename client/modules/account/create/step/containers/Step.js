// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import UserWrapper from '../../../../user/containers/UserWrapper';
import StepRouter from './StepRouter';
import StepForm from './StepForm';
import StepHelp from './StepHelp';
import StepHeader from '../components/StepHeader';
import StepProgressBar from '../components/StepProgressBar';
import StepBackground from '../components/StepBackground';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
const Step = (props: { params: { step: string }, user: {} }) => {
  const { params, user } = props;

  return (
    <StepContainer>
      <StepProgressBar params={params} />
      <StepHeader />
      <StepBackground />
      {user.isLoaded &&
        <StepRouter params={params}>
          <StepForm params={params} />
          <StepHelp params={params} />
        </StepRouter>}
    </StepContainer>
  );
};

export default connect()(UserWrapper(Step));

const StepContainer = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 46px auto 0;

  ${media.tablet`
    flex-direction: column;
    margin-top: 0;
  `};
`;
