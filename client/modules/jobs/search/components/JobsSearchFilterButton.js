// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import { FadeIn } from '../../../../styles/animate/';
import { FilterIcon } from '../../../../icons';
import { toggleMobileFilters } from '../ducks';

const JobSearchFilterButton = ({ dispatch, showMobileFilters }) => (
  <FadeIn>
    <JobSearchFilterButtonContainer
      showMobileFilters={showMobileFilters}
      onClick={() => dispatch(toggleMobileFilters())}
    >
      <FilterIcon height={14} />
      <JobSearchFilterButtonText>Search & Filter</JobSearchFilterButtonText>
    </JobSearchFilterButtonContainer>
  </FadeIn>
);

const mapStateToProps = state => ({
  showMobileFilters: state.search.jobs.showMobileFilters
});

export default connect(mapStateToProps)(JobSearchFilterButton);

const JobSearchFilterButtonContainer = styled.div`
  position: fixed;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: ${props => props.theme.colors.purple};
  color: white;
  box-shadow: rgba(99, 114, 130, 0.16) 0px 0px 0px 1px,
    rgba(27, 39, 51, 0.08) 0px 8px 16px;
  bottom: 25px;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 150px;
  padding: 10px;
  font-size: 14px;
  z-index: 2000;
  transform: translateY(${props => (props.showMobileFilters ? '150' : '0')}px);
  will-change: transform;
  transition: transform 480ms cubic-bezier(0.455, 0.03, 0.515, 0.955);

  ${media.tablet`
    display: flex;
  `};

  svg {
    position: relative;
    top: -1px;
  }
`;

const JobSearchFilterButtonText = styled.span`
  position: relative;
  top: 1px;
  padding-left: 3px;
`;
