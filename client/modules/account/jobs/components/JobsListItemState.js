// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { showModal } from '../../../modal/ducks';

/**
 * JobsListItemState()
 */
const JobsListItemState = props => {
  const { dispatch, job } = props;

  switch (job.state) {
    case 'pending':
      return (
        <JobsState
          onClick={() => dispatch(showModal('JOB_PAYMENT_MODAL', job))}
        >
          <PublishButton>Publish</PublishButton>
        </JobsState>
      );
    case 'active':
      return <JobsState />;
    default:
      return null;
  }
};

export default JobsListItemState;

const JobsState = styled.div`
  font-size: 14px;
  text-transform: capitalize;
`;

const PublishButton = styled.button`
  width: 80px;
  font-size: 14px;
  color: ${props => props.theme.colors.purple};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.purple};
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
  transition: all 260ms ease;

  &:hover {
    background: ${props => props.theme.colors.purple};
    color: #fff;
  }

  ${media.phablet`
    width: 66px;
    padding: 2px 6px;
    font-size: 12px;
  `};
`;
const ActivePill = styled.div`
  width: 80px;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 30px;
  color: ${props => props.theme.colors.green};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.green};
  padding: 4px 8px;

  ${media.phablet`
    width: 66px;
    padding: 2px 6px;
    font-size: 12px;
  `};
`;
