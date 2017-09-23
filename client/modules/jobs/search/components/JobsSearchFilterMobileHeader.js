// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ExIcon } from '../../../../icons';
import { toggleMobileFilters } from '../ducks';

const JobSearchFilterMobileHeader = ({ dispatch }) => (
  <JobSearchFilterMobileHeaderContainer>
    <JobSearchFilterMobileHeaderButton
      onClick={() => dispatch(toggleMobileFilters())}
    >
      <ExIcon />
    </JobSearchFilterMobileHeaderButton>
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
  box-shadow: 0 2px 8px rgba(27, 39, 51, 0.08);

  svg {
    fill: #212121;
  }
`;

const JobSearchFilterMobileHeaderButton = styled.button`
  appearance: none;
  background: white;
  border: 0;
`;
