// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Link } from 'react-router';
import moment from 'moment';
import { FadeIn } from '../../../../styles/animate/';

const trunc = (str: string, length: number): string =>
  str.length > length ? `${str.substr(0, length - 1)}...` : str;

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
    <FadeIn>
      <JobsSearchPostingContainer>
        <JobsSearchPostingTop>
          <div>
            <JobsSearchPostingTitle>{posting.title}</JobsSearchPostingTitle>
            <JobsSearchPostingSubTitle>
              <span>
                <Purple>{posting.company.displayName}</Purple>
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
          {trunc(posting.company.product, 175)}
        </JobsSearchPostingCompanyProduct>
        <JobsSearchPostingBottom>
          <JobsSearchPostingType>
            {posting.employmentType} · ${posting.salary.max / 1000}K {' - '}${posting.salary.min / 1000}K
          </JobsSearchPostingType>
          <span>{moment(posting.createdAt).fromNow()}</span>
        </JobsSearchPostingBottom>
        <StyledLink to={`/jobs/${posting._id}`} />
      </JobsSearchPostingContainer>
    </FadeIn>
  );
};

export default JobsSearchPosting;

const JobsSearchPostingContainer = styled.div`
  position: relative;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 50px;

  ${media.phablet`
    margin-bottom: 30px;
  `};
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

const Purple = styled.span`
  color: ${props => props.theme.colors.purple};
  font-weight: 600;
`;

const JobsSearchPostingTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  ${media.tablet`
    margin-bottom: 12px;
  `};

  ${media.phablet`
    margin-bottom: 10px;
  `};

  ${media.phonePlus`
    margin-bottom: 6px;
  `};
`;

const JobsSearchPostingBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #545454;

  ${media.phablet`
    font-size: 14px;
  `};
`;

const JobsSearchPostingTitle = styled.h2`
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 5px;

  ${media.tablet`
    font-size: 20px;
    margin-bottom: 4px;
  `};

  ${media.phablet`
    margin-bottom: 2px;
  `};
`;

const JobsSearchPostingSubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const JobsSearchPostingType = styled.div`display: flex;`;

const JobsSearchPostingCompanyProduct = styled.p`
  line-height: 1.6;
  margin-bottom: 15px;
  color: #828282;

  ${media.phablet`
    font-size: 14px;
    margin-bottom: 10px;
  `};
`;
