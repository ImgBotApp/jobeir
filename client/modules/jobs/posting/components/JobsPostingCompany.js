// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { FadeIn } from '../../../../styles/animate';

const JobsPostingCompany = (props: { activePosting: {} }) => {
  const { activePosting } = props;
  const activePostingReady: boolean = Object.keys(activePosting).length > 0;

  return (
    <JobsPostingCompanyContainer>
      {activePostingReady && (
        <FadeIn>
          <JobsPostingCompanyHeader>
            About {activePosting.company.displayName}
          </JobsPostingCompanyHeader>
          <JobsPostingCompanyText>
            {activePosting.company.product}
          </JobsPostingCompanyText>
          <JobsPostingCompanyInfo>
            <JobsPostingCompanyInfoHeader>
              Locations
            </JobsPostingCompanyInfoHeader>
            <JobsPostingCompanyText>
              {activePosting.company.locations.map(location => (
                <JobsPostingCompanyLocation key={location._id}>
                  {location.address.street_number} {location.address.route},{' '}
                  {location.address.locality}, {location.address.country}
                </JobsPostingCompanyLocation>
              ))}
            </JobsPostingCompanyText>
          </JobsPostingCompanyInfo>
          <JobsPostingCompanyLink
            href={`${activePosting.externalLink}?ref=gost`}
            target="_blank"
          >
            Apply Now
          </JobsPostingCompanyLink>
        </FadeIn>
      )}
    </JobsPostingCompanyContainer>
  );
};

export default JobsPostingCompany;

const JobsPostingCompanyContainer = styled.div`
  max-width: 670px;
  padding: 0 24px;
  margin: 50px auto;
`;

const JobsPostingCompanyHeader = styled.h3`
  font-size: 38px;
  font-weight: 900;
  margin-bottom: 20px;

  ${media.tablet`
    margin-bottom: 15px;
    font-size: 30px;
  `};
`;

const JobsPostingCompanyText = styled.p`
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 20px;

  ${media.desktop`
    font-size: 18px;
  `};

  ${media.phablet`
    font-size: 16px;
  `};

  ${media.phonePlus`
    margin-bottom: 15px;
  `};
`;

const JobsPostingCompanyInfoHeader = styled.h4`
  line-height: 1.5;
  margin-bottom: 0px;
  font-size: 20px;
  font-weight: 800;
`;

const JobsPostingCompanyInfo = styled.div`
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 20px;
`;

const JobsPostingCompanyLocation = styled.div`margin-bottom: 10px;`;

const JobsPostingCompanyLink = styled.a`
  display: block;
  width: 100%;
  font-size: 18px;
  padding: 18px;
  color: white;
  background-color: ${props => props.theme.colors.purple};
  border-radius: 4px;
  cursor: pointer;
  margin: 50px auto 100px;
  text-align: center;
  text-decoration: none;

  ${media.phablet`
    padding: 16px;
    margin: 30px auto;
  `};
`;
