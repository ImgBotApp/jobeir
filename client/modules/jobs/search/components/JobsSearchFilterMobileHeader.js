// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { initialize } from 'redux-form';
import { ExIcon } from '../../../../icons';
import { toggleMobileFilters } from '../ducks';

const JobSearchFilterMobileHeader = props => {
  const { dispatch, isFiltering, search = { coordinates: [] } } = props;

  const reset = {
    location: search.location,
    lat: search.lat || (search.coordinates && search.coordinates[0]),
    lng: search.lng || (search.coordinates && search.coordinates[1]),
    title: {
      label: search.title && search.title.value,
      value: search.title && search.title.value
    },
    companySize: undefined,
    distance: undefined,
    employmentType: undefined,
    equity: undefined,
    remote: undefined
  };

  return (
    <JobSearchFilterMobileHeaderContainer>
      <JobSearchFilterMobileHeaderButton
        onClick={() => dispatch(toggleMobileFilters())}
      >
        <ExIcon />
      </JobSearchFilterMobileHeaderButton>
      <JobSearchFilterMobileClear
        onClick={() => dispatch(initialize('search', reset))}
      >
        Clear filters
      </JobSearchFilterMobileClear>
    </JobSearchFilterMobileHeaderContainer>
  );
};
const mapStateToProps = state => ({
  showMobileFilters: state.search.jobs.showMobileFilters,
  search: (state.form.search && state.form.search.values) || {}
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

const JobSearchFilterMobileHeaderButton = styled.button`
  appearance: none;
  background: white;
  border: 0;
`;

const JobSearchFilterMobileClear = styled.div`
  color: ${props => props.theme.colors.black};
`;
