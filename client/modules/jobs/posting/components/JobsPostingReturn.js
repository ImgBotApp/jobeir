// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Link } from 'react-router';
import { ChevronLeft } from '../../../../icons/';

const JobsPostingReturn = (props: { query: string }) =>
  <div>
    <JobsPostingReturnContainer>
      <StyledLink to={`/jobs/?${props.query}`}>
        <StyledChevronLeft />Return to jobs
      </StyledLink>
    </JobsPostingReturnContainer>
  </div>;

const mapStateToProps = state => ({
  query: state.search.jobs.query
});

export default connect(mapStateToProps)(JobsPostingReturn);

const JobsPostingReturnContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 670px;
  margin: 0 auto 60px;

  ${media.phablet`
    margin-bottom: 20px;
  `};
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

  ${media.phablet`
    font-size: 16px;
  `};
`;
