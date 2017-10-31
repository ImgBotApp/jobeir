// @flow
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import moment from 'moment';
import { showModal } from '../../../modal/ducks';
import JobsListItemState from './JobsListItemState';
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
        <JobsListItemState job={job} dispatch={dispatch} />
      </JobsMain>
      <JobsSub onClick={() => browserHistory.push(`/account/jobs/${job._id}`)}>
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

        {job.published && (
          <span>
            <HideOnMobile>
              <JobsDot>·</JobsDot>
            </HideOnMobile>
            <HideOnMobile>Published</HideOnMobile>{' '}
            {moment(job.published).fromNow()}
          </span>
        )}
      </JobsSub>

      {job.state === 'pending' && (
        <JobsDetails>
          <HideOnMobile>
            <Eye />
          </HideOnMobile>
          <JobsDetailsText>
            This job post is not viewable. You must{' '}
            <u
              style={{ textDecoration: 'ink' }}
              onClick={() => dispatch(showModal('JOB_PAYMENT_MODAL', job))}
            >
              publish
            </u>{' '}
            a job post before applicants can see it.
          </JobsDetailsText>
        </JobsDetails>
      )}
    </div>
  );
};

export default connect()(JobsListItem);

const JobsTitle = styled.h3`
  font-size: 22px;

  ${media.phablet`
    position: relative;
    top: 2px;
    font-size: 19px;
  `};
`;

const JobsState = styled.div`
  font-size: 14px;
  text-transform: capitalize;
`;

const JobsMain = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const JobsSub = styled.div`
  display: flex;
  align-items: center;
  color: #929292;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 200;

  ${media.phablet`
    justify-content: space-between;
    flex-direction: row-reverse;
    margin-top: 8px;
  `};
`;

const JobsDetails = styled.div`
  display: flex;
  margin-top: 8px;
`;

const JobsDetailsText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-left: 8px;
  line-height: 1.6;
  color: #444;

  ${media.phablet`
    margin: 0;
    font-size: 14px;
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

const Eye = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    enableBackground="new 0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill="none"
        stroke="#444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M0.5,8 c0,0,3-5.5,7.5-5.5S15.5,8,15.5,8s-3,5.5-7.5,5.5S0.5,8,0.5,8z"
      />{' '}
      <path
        data-color="color-2"
        fill="none"
        stroke="#444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M5,8 c0-1.657,1.343-3,3-3"
      />{' '}
      <path
        data-color="color-2"
        fill="none"
        stroke="#444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d=" M11,8c0,1.657-1.343,3-3,3"
      />{' '}
      <line
        data-color="color-2"
        fill="none"
        stroke="#444"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        x1="1"
        y1="15"
        x2="15"
        y2="1"
      />{' '}
    </g>
  </svg>
);
