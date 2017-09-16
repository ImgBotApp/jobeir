// @flow
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import JobsPostingHeaderPlaceholder from './JobPostingHeaderPlaceholder';
import { FadeIn } from '../../../../../styles/animate/';

const JobsPostingHeader = (props: { activePosting: {}, hideLogo: boolean }) => {
  const { activePosting, hideLogo } = props;
  const activePostingReady: boolean = Object.keys(activePosting).length > 0;

  return (
    <div>
      <JobsPostingHeaderContainer>
        {activePostingReady
          ? <FadeIn>
              <JobsPostingHeaderCompany>
                {!hideLogo &&
                  <JobsPostingHeaderCompanyLogo
                    src={activePosting.company.logo}
                    alt={activePosting.company.displayName}
                  />}
              </JobsPostingHeaderCompany>
              <JobsPostingHeaderTitle>
                {activePosting.title}
              </JobsPostingHeaderTitle>
              <JobsPostingHeaderLocation>
                Located in {activePosting.location.address.locality},{' '}
                {activePosting.location.address.country}
              </JobsPostingHeaderLocation>
              <JobsPostingHeaderDate>
                {moment(activePosting.createdAt).format('MMMM Do, YYYY')}
              </JobsPostingHeaderDate>
            </FadeIn>
          : <JobsPostingHeaderPlaceholder />}
      </JobsPostingHeaderContainer>
    </div>
  );
};

export default JobsPostingHeader;

const JobsPostingHeaderContainer = styled.div`
  max-width: 670px;
  margin: 0 auto 75px;
`;

const JobsPostingHeaderCompanyLogo = styled.img`height: 50px;`;

const JobsPostingHeaderCompany = styled.div`margin-bottom: 30px;`;

const JobsPostingHeaderTitle = styled.h1`
  font-size: 46px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const JobsPostingHeaderLocation = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const JobsPostingHeaderDate = styled.p`
  font-size: 18px;
  font-weight: 400;
`;
