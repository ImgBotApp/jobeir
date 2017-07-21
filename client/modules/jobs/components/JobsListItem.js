import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import moment from 'moment';

const JobsListItem = ({ posting }) => {
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
      <StyledLink to={`/jobs/${posting._id}`} />
    </JobsListItemContainer>
  );
};

export default JobsListItem;

const JobsListItemContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  margin-bottom: 25px;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
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
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 10px;
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
