// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ExIcon } from '../../../../icons';
import { toggleMobileFilters } from '../ducks';

const JobSearchFilterMobileHeader = ({ dispatch }) => (
  <JobSearchFilterMobileHeaderContainer>
    <button onClick={() => dispatch(toggleMobileFilters())}>
      <ExIcon />
    </button>
    <div>Filters</div>
    <div>Reset</div>
  </JobSearchFilterMobileHeaderContainer>
);

const mapStateToProps = state => ({
  showMobileFilters: state.search.jobs.showMobileFilters
});

export default connect(mapStateToProps)(JobSearchFilterMobileHeader);

const JobSearchFilterMobileHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  padding: 14px 24px;
  background: #fff;
  z-index: 200;

  svg {
    fill: #212121;
  }
`;

const JobSearchFilterMobileHeaderText = styled.span``;
