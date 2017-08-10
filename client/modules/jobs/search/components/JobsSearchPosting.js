// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import moment from 'moment';

const JobsSearchPosting = (props: {
  posting: {
    title: string,
    company: {
      displayName: string,
      product: string,
      logo: string
    },
    location: {
      address: {
        locality: string,
        short_administrative_area_level_1: string,
        country: string
      }
    },
    _id: string,
    employmentType: string,
    salaryMax: {
      min: number,
      max: number
    },
    salaryMin: number,
    createdAt: string
  }
}) => {
  const { posting } = props;

  return (
    <JobsSearchPostingContainer>
      <JobsSearchPostingTop>
        <div>
          <JobsSearchPostingTitle>
            {posting.title}
          </JobsSearchPostingTitle>
          <JobsSearchPostingSubTitle>
            <span>
              {posting.company.displayName}
              {' in '}
            </span>
            <span>
              {posting.location.address.locality},{' '}
              {posting.location.address.short_administrative_area_level_1},{' '}
              {posting.location.address.country}
            </span>
          </JobsSearchPostingSubTitle>
        </div>
      </JobsSearchPostingTop>
      <JobsSearchPostingCompanyProduct>
        {posting.company.product}
      </JobsSearchPostingCompanyProduct>
      <JobsSearchPostingBottom>
        <JobsSearchPostingType>
          {posting.employmentType} · ${posting.salary.max / 1000}K {' - '}${posting.salary.min / 1000}K
        </JobsSearchPostingType>
        <span>
          {moment(posting.createdAt).fromNow()}
        </span>
      </JobsSearchPostingBottom>
      <StyledLink to={`/jobs/${posting._id}`} />
    </JobsSearchPostingContainer>
  );
};

export default JobsSearchPosting;

const JobsSearchPostingContainer = styled.div`
  position: relative;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 50px;
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

const JobsSearchPostingTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const JobsSearchPostingBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6a6666;
`;

const JobsSearchPostingTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 5px;
`;

const JobsSearchPostingSubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const JobsSearchPostingType = styled.div`display: flex;`;

const JobsSearchPostingCompanyProduct = styled.p`
  line-height: 1.6;
  margin-bottom: 20px;
  color: #6a6666;
`;
