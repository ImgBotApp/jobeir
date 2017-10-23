// @flow
import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import styled from 'styled-components';
import { FadeIn } from '../../../../styles/animate/';
/**
 * Pass in the current search form values to see if the user has applied
 * and filters. This is used to toggle the visbility of the reset button
 */
const showResetButton = (search = {}) => {
  const { location, lat, lng, title, ...rest } = search;

  return Object.values(rest).some(filter => filter);
};

const JobSearchFilterReset = (props: { isFiltering: boolean, search: {} }) => {
  const { dispatch, isFiltering, search = { coordinates: [] } } = props;

  /**
   * Using this to reset the job filters. We want to keep the values from
   * the original search such as title and location/lat/long
   */

  const reset = {
    location: search.location,
    lat: search.lat || (search.coordinates && search.coordinates[0]),
    lng: search.lng || (search.coordinates && search.coordinates[1]),
    title: {
      ...search.title
    },
    companySize: undefined,
    distance: undefined,
    employmentType: undefined,
    equity: undefined,
    remote: undefined
  };

  if (!showResetButton(search)) return null;

  return (
    <FadeIn>
      <JobSearchFilterResetContainer
        onClick={() => dispatch(initialize('search', reset))}
      >
        <JobSearchFilterResetCircleEx>
          <JobSearchFilterResetInner>×</JobSearchFilterResetInner>
        </JobSearchFilterResetCircleEx>
        <JobSearchFilterResetText>reset</JobSearchFilterResetText>
      </JobSearchFilterResetContainer>
    </FadeIn>
  );
};

const mapStateToProps = state => ({
  search: (state.form.search && state.form.search.values) || {},
  isFiltering: state.search.jobs.isFiltering
});

export default connect(mapStateToProps)(JobSearchFilterReset);

const JobSearchFilterResetContainer = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  top: 1px;

  &:hover > div:first-child {
    background: ${props => props.theme.colors.purple};
    color: white;
  }
`;

const JobSearchFilterResetCircleEx = styled.div`
  border: 1px solid ${props => props.theme.colors.purple};
  border-radius: 50%;
  font-size: 16px;
  font-weight: 300;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6dc5;
  padding: 0px;
  margin-right: 10px;
`;

const JobSearchFilterResetInner = styled.span`
  position: relative;
  top: 1px;
  pointer-events: none;
`;

const JobSearchFilterResetText = styled.span`
  position: relative;
  top: 1px;
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.purple};
`;
