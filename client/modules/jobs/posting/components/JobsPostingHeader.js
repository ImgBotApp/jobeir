// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router';
import JobsPostingHeaderPlaceholder from './JostPostingHeaderPlaceholder';
import { ChevronLeft } from '../../../../icons/';
import FadeIn from '../../../../styles/components/FadeIn';

const JobsPostingHeader = (props: { activePosting: {}, query: string }) => {
  const { activePosting, query } = props;
  const activePostingReady: boolean = Object.keys(activePosting).length > 0;

  return (
    <div>
      <JobsPostingHeaderContainer>
        <JobsPostingHeaderReturn>
          <StyledLink to={`/jobs/?${query}`}>
            <StyledChevronLeft />Return to jobs
          </StyledLink>
        </JobsPostingHeaderReturn>
        {activePostingReady
          ? <FadeIn>
              <JobsPostingHeaderCompany>
                <JobsPostingHeaderCompanyLogo
                  src={activePosting.company.logo}
                  alt={activePosting.company.displayName}
                />
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

const mapStateToProps = state => ({
  query: state.search.jobs.query
});

export default connect(mapStateToProps)(JobsPostingHeader);

const JobsPostingHeaderContainer = styled.div`margin-bottom: 75px;`;

const JobsPostingHeaderReturn = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 60px;
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

const StyledChevronLeft = styled(ChevronLeft)`
  fill: rgba(0,0,0,0.85);
  position: relative;
  top: -1px;
  left: -4px;
`;

const StyledLink = styled(Link)`
  position: relative;
  left: -3px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  color: rgba(0,0,0,0.85);
  padding: 3px 6px 2px 3px;
  border-radius: 3px;
  transition: background 280ms ease;

  &:hover {
    background: rgba(0,0,0,0.08);
  }
`;
