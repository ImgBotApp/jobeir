import React from 'react';
import styled from 'styled-components';

const JobsListItem = ({ posting }) => {
  console.log(posting);
  return (
    <JobsListItemContainer>
      <div>
        {posting.company.displayName}
      </div>
      <div>
        {posting.company.logo}
      </div>
      <div>
        {posting.title}
      </div>
      <div>
        {posting.employmentType}
      </div>
      <div>
        {posting.salaryMax}
      </div>
      <div>
        {posting.salaryMin}
      </div>
      <div>
        {posting.location.address.locality}
      </div>
      <div>
        {posting.location.address.short_administrative_area_level_1}
      </div>
      <div>
        {posting.location.address.country}
      </div>
      <div>
        {posting._id}
      </div>
      <div>
        {posting.createdAt}
      </div>
    </JobsListItemContainer>
  );
};

export default JobsListItem;

const JobsListItemContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 50px 0;
`;
