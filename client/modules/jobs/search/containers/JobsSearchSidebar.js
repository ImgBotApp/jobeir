// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import queryString from 'query-string';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import {
  jobTypeOptions,
  distanceOptions,
  companySizeOptions,
  yesNoOptions
} from '../../../user-input/options';
import sidebar from '../../../user-input/themes/sidebar-theme';
import { Radio } from '../../../user-input/inputs/input';
import SidebarSearchForm from '../../../user-input/forms/form/search/SidebarSearchForm';

class JobsSearchSidebar extends Component {
  componentDidUpdate(prevProps) {
    const updatedLocation = prevProps.search.lat !== this.props.search.lat;

    if (
      JSON.stringify(prevProps.search) !== JSON.stringify(this.props.search)
    ) {
      this.udpateSearchQuery(updatedLocation);
    }
  }

  udpateSearchQuery = updatedLocation => {
    const { search, jobs: { isLoaded } } = this.props;
    const parsed = queryString.parse(location.search);

    // Creating a new updated query with the correct start position
    const objectQuery = {
      l: updatedLocation ? search.location : parsed.l,
      q: (search.title && search.title.value) || parsed.q,
      s: search.start,
      lat: updatedLocation ? search.lat : parsed.lat,
      lng: updatedLocation ? search.lng : parsed.lng,
      et: search.employmentType,
      eq: search.equity,
      d: search.distance,
      r: search.remote,
      cs: search.companySize
    };

    // Removing false values from obj
    const cleanedQuery = pickBy(objectQuery, identity);
    const updatedQuery = queryString.stringify(cleanedQuery);

    if (isLoaded) {
      browserHistory.replace(`/jobs?${updatedQuery}`);
    }
  };

  render() {
    return (
      <JobsSearchSidebarContainer>
        <SidebarSearchForm />
        <ThemeProvider theme={sidebar}>
          <div>
            <Field
              name="employmentType"
              label="Job Type"
              options={jobTypeOptions}
              type="circle"
              component={Radio}
            />
            <Field
              name="companySize"
              label="Company Size"
              options={companySizeOptions}
              type="circle"
              component={Radio}
            />
            <Field
              name="remote"
              label="Open to Remote"
              options={yesNoOptions}
              type="circle"
              component={Radio}
            />
            <Field
              name="equity"
              label="Equity"
              options={yesNoOptions}
              type="circle"
              component={Radio}
            />
            <Field
              name="distance"
              label="Distance radius"
              options={distanceOptions}
              type="circle"
              component={Radio}
            />
          </div>
        </ThemeProvider>
      </JobsSearchSidebarContainer>
    );
  }
}

const mapStateToProps = state => ({
  query:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.query,
  jobs: state.search.jobs,
  search: (state.form.search && state.form.search.values) || {}
});

JobsSearchSidebar = reduxForm({
  form: 'search',
  destroyOnUnmount: false,
  enableReinitialize: true
})(JobsSearchSidebar);

export default connect(mapStateToProps)(JobsSearchSidebar);

const JobsSearchSidebarContainer = styled.div``;
