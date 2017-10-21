// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { Link } from 'react-router';
import { ChevronLeft } from '../../../../icons/';

const JobsPostingReturn = (props: { query: string, externalLink: string }) => (
  <div>
    <JobsPostingReturnContainer>
      <StyledLink to={`/jobs/?${props.query}`}>
        <StyledChevronLeft />Return to Job Search
      </StyledLink>
      <StyledExternalLink
        href={`${props.externalLink}?ref=jobeir`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply
      </StyledExternalLink>
    </JobsPostingReturnContainer>
  </div>
);

const mapStateToProps = state => ({
  query: state.search.jobs.query
});

export default connect(mapStateToProps)(JobsPostingReturn);

const JobsPostingReturnContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 724px;
  margin: 20px auto 30px;
  padding: 30px 24px;

  ${media.phablet`
    margin: 5px auto;
    padding: 10px 24px;
  `};
`;

const StyledChevronLeft = styled(ChevronLeft)`
  fill: rgba(0, 0, 0, 0.85);
  position: relative;
  top: -1px;
  left: -2px;
  transition: transform 280ms ease;
`;

const StyledLink = styled(Link)`
  position: relative;
  left: -3px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  padding: 3px 6px 2px 3px;
  border-radius: 3px;
  transition: background 180ms ease;

  &:hover svg {
    transform: translateX(-5px);
  }

  ${media.phablet`
    font-size: 16px;
  `};
`;

const StyledExternalLink = styled.a`
  position: absolute;
  right: 69px;
  top: 9px;
  width: 80px;
  height: 80px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.purple};
  background: ${props => props.theme.colors.purple};
  border: 2px solid ${props => props.theme.colors.purple};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 200ms ease;

  &:hover {
    background: ${props => props.theme.colors.purple};
    color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.22);
  }

  background: transparent;
  border: 2px solid ${props => props.theme.colors.purple};

  ${media.tablet`
    display: none;
  `};
`;
