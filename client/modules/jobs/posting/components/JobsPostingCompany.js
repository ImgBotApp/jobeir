// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { FadeIn } from '../../../../styles/animate';

const JobsPostingCompany = (props: { activePosting: {} }) => {
  const { activePosting } = props;
  const activePostingReady: boolean =
    Object.keys(activePosting.company).length > 0;

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
          <JobsPostingCompanyLink
            href={`${activePosting.externalLink}?ref=gost`}
            target="_blank"
            rel="noopener noreferrer"
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
  max-width: 740px;
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
  line-height: 36px;
  margin-bottom: 20px;
  font-size: 19px;
  color: #2b2b2b;
  font-family: 'Tiempos', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

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
