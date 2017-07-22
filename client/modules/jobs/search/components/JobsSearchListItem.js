import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import moment from 'moment';

const JobsSearchListItem = ({ posting }) => {
  return (
    <JobsSearchListItemContainer>
      <JobsSearchListItemTop>
        <div>
          <JobsSearchListItemTitle>
            {posting.title}
          </JobsSearchListItemTitle>
          <JobsSearchListItemSubTitle>
            <span>
              {posting.company.displayName}
              {' in '}
            </span>
            <span>
              {posting.location.address.locality},{' '}
              {posting.location.address.short_administrative_area_level_1},{' '}
              {posting.location.address.country}
            </span>
          </JobsSearchListItemSubTitle>
        </div>
        <JobsSearchListItemLogo src={posting.company.logo} alt="" />
      </JobsSearchListItemTop>
      <JobsSearchListItemCompanyProduct>
        {posting.company.product}
      </JobsSearchListItemCompanyProduct>
      <JobsSearchListItemBottom>
        <JobsSearchListItemType>
          {posting.employmentType}, ${posting.salaryMax / 1000}K {' - '}${posting.salaryMin / 1000}K
        </JobsSearchListItemType>
        <JobsSearchListItemDate>
          {moment(posting.createdAt).fromNow()}
        </JobsSearchListItemDate>
      </JobsSearchListItemBottom>
      <StyledLink to={`/jobs/${posting._id}`} />
    </JobsSearchListItemContainer>
  );
};

export default JobsSearchListItem;

const JobsSearchListItemContainer = styled.div`
  position: relative;
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

const JobsSearchListItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const JobsSearchListItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8f8f8f;
`;

const JobsSearchListItemTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 10px;
`;

const JobsSearchListItemSubTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.7;
`;

const JobsSearchListItemLogo = styled.img`
  height: 35px;
  border-radius: 100%;
  vertical-align: middle;
  border-radius: 4px;
  overflow: hidden;
  align-self: flex-start;
`;

const JobsSearchListItemType = styled.div`display: flex;`;

const JobsSearchListItemDate = styled.div``;

const JobsSearchListItemCompanyProduct = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
  color: #6a6666;
  max-width: 540px;
`;
