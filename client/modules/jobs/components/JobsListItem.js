import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const JobsListItem = ({ posting }) => {
  console.log(posting);
  return (
    <JobsListItemContainer>
      <JobsListItemTop>
        <div>
          <JobsListItemTitle>
            {posting.title}
          </JobsListItemTitle>
          <JobsListItemSubTitle>
            <span>
              {posting.company.displayName}
              {' in '}
            </span>
            <span>
              {posting.location.address.locality},{' '}
              {posting.location.address.short_administrative_area_level_1},{' '}
              {posting.location.address.country}
            </span>
          </JobsListItemSubTitle>
        </div>
        <JobsListItemLogo src={posting.company.logo} alt="" />
      </JobsListItemTop>
      <JobsListItemCompanyProduct>
        {posting.company.product}
      </JobsListItemCompanyProduct>
      <JobsListItemBottom>
        <JobsListItemType>
          {posting.employmentType}, ${posting.salaryMax / 1000}K {' - '}${posting.salaryMin / 1000}K
        </JobsListItemType>
        <JobsListItemDate>
          {moment(posting.createdAt).fromNow()}
        </JobsListItemDate>
      </JobsListItemBottom>
    </JobsListItemContainer>
  );
};

export default JobsListItem;

const JobsListItemContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 25px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const JobsListItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const JobsListItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8f8f8f;
`;

const JobsListItemTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 4px;
`;

const JobsListItemSubTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.7;
`;

const JobsListItemLogo = styled.img`
  height: 35px;
  border-radius: 100%;
  vertical-align: middle;
  border-radius: 4px;
  overflow: hidden;
  align-self: flex-start;
`;

const JobsListItemType = styled.div`display: flex;`;

const JobsListItemDate = styled.div``;

const JobsListItemCompanyProduct = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
  color: #6a6666;
  max-width: 540px;
`;
