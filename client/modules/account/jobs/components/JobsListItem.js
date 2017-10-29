// @flow
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import moment from 'moment';
import { showModal } from '../../../modal/ducks';

/**
 * JobsListItem()
 * Gets passed a single job posting and will render the list item
 * to the Jobs page within the account section.
 */
const JobsListItem = (props: {
  job: {
    _id: string,
    title: string,
    location: {
      address: {
        locality: string,
        administrative_area_level_1: string
      }
    },
    salary: {
      max: number,
      min: number
    },
    state: string,
    createdAt: string
  }
}) => {
  const { dispatch, job } = props;

  return (
    <div>
      <JobsMain>
        <JobsTitle
          onClick={() => browserHistory.push(`/account/jobs/${job._id}`)}
        >
          {job.title}
        </JobsTitle>
        <JobsState
          onClick={() => dispatch(showModal('JOB_PAYMENT_MODAL', job))}
        >
          {job.state}
        </JobsState>
      </JobsMain>
      <JobsSub>
        <div>
          <HideOnMobile>Created</HideOnMobile> {moment(job.createdAt).fromNow()}
          <HideOnMobile>
            <JobsDot>·</JobsDot>
          </HideOnMobile>
        </div>
        <div>
          {job.location.address.locality}
          {', '}
          {job.location.address.administrative_area_level_1}
        </div>
        <JobsDot>·</JobsDot>
        <HideOnMobile>
          ${job.salary.min / 1000}K - ${job.salary.max / 1000}K
        </HideOnMobile>
      </JobsSub>
    </div>
  );
};

export default connect()(JobsListItem);

const JobsTitle = styled.h3`
  font-size: 22px;

  ${media.phablet`
  font-size: 18px;
  `};
`;

const JobsState = styled.div`
  font-size: 14px;
  text-transform: capitalize;
`;

const JobsMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JobsSub = styled.div`
  display: flex;
  color: #929292;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 200;

  ${media.phablet`
    justify-content: space-between;
    flex-direction: row-reverse;
    margin-top: 6px;
  `};
`;

const JobsDot = styled.span`
  display: inline-block;
  padding: 0 5px;

  ${media.phablet`
    display: none;
  `};
`;

const HideOnMobile = styled.span`
  ${media.phablet`
    display: none;
  `};
`;
