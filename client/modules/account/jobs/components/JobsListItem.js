import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

/**
 * JobsListItem()
 * Gets passed a single job posting and will render the list item
 * to the Jobs page within the account section.
 */
const JobsListItem = ({ job }) => {
  return (
    <div>
      <JobsMain>
        <JobsTitle>{job.title}</JobsTitle>
        <JobsState>{job.state}</JobsState>
      </JobsMain>
      <JobsSub>
        <div>Created {moment(job.dateCreated).fromNow()}</div>
        <JobsDot>·</JobsDot>
        <div>
          {job.location.address.locality}{', '}
          {job.location.address.administrative_area_level_1}
        </div>
        <JobsDot>·</JobsDot>
        <div>
          ${job.salaryMin / 1000}K - ${job.salaryMax / 1000}K
        </div>
      </JobsSub>
    </div>
  );
};

export default JobsListItem;

const JobsTitle = styled.h3`
  font-size: 24px;
`;

const JobsState = styled.div`
  font-size: 14px;
`;

const JobsMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const JobsSub = styled.div`
  display: flex;
  color: #929292;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 200;
`;

const JobsDot = styled.span`
  display: inline-block;
  padding: 0 5px;
`;
