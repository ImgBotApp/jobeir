// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, initialize, reduxForm } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import queryString from 'query-string';
import { Radio, Text } from '../../../user-input/inputs/input';
import sidebar from '../../../user-input/themes/sidebar-theme';

const jobTypes: Array<{ name: string, value: string }> = [
  { name: 'Full-time', value: 'Full-time' },
  { name: 'Part-time', value: 'Part-time' },
  { name: 'Contractor', value: 'Contractor' },
  { name: 'Freelance', value: 'Freelance' },
  { name: 'Intern', value: 'Intern' },
  { name: 'Volunteer', value: 'Volunteer' }
];

const distanceOptions: Array<{ name: string, value: string }> = [
  { name: '10 km', value: '10' },
  { name: '50 km', value: '50' },
  { name: '100 km', value: '100' },
  { name: '200 km', value: '200' }
];

const companySizeOptions: Array<{ name: string, value: string }> = [
  { name: '1 - 9', value: '1-9' },
  { name: '10 - 49', value: '10-49' },
  { name: '50 - 149', value: '50-149' },
  { name: '150 - 499', value: '150-499' },
  { name: '500 - 999', value: '500-999' },
  { name: '1000 +', value: '1000+' }
];

const yesNoOptions: Array<{ text: string, value: string }> = [
  { name: 'Yes', value: 'Yes' },
  { name: 'No', value: 'No' }
];

class JobsSearchSidebar extends Component {
  constructor(props) {
    super(props);
    const { search = {} } = this.props;
    /**
     * Using this to reset the job filters. We want to keep the values from
     * the original search such as title and location/lat/long
     */
    this.reset = {
      location: search.location,
      lat: search.lat || search.coordinates[0],
      lng: search.lng || search.coordinates[1],
      title: {
        value: search.title && search.title.value
      },
      companySize: undefined,
      distance: undefined,
      employmentType: undefined,
      equity: undefined,
      remote: undefined
    };
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.search) !== JSON.stringify(this.props.search)
    ) {
      this.udpateSearchQuery();
    }
  }

  udpateSearchQuery = () => {
    const { search, jobs: { isLoaded } } = this.props;
    // Creating a new updated query with the correct start position
    const updatedQuery = queryString.stringify({
      l: search.location,
      q: (search.title && search.title.value) || undefined,
      s: search.start,
      lat: search.lat,
      lng: search.lng,
      et: search.employmentType,
      eq: search.equity,
      d: search.distance,
      r: search.remote,
      cs: search.companySize
    });

    if (isLoaded) {
      browserHistory.replace(`/jobs?${updatedQuery}`);
    }
  };

  handleResetClick = () => {
    this.props.dispatch(initialize('search', this.reset));
  };

  render() {
    return (
      <JobsSearchSidebarContainer>
        <div onClick={this.handleResetClick}>Reset</div>
        <ThemeProvider theme={sidebar}>
          <div>
            <Field
              name="employmentType"
              label="Job Type"
              options={jobTypes}
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
              name="distance"
              label="Distance radius"
              options={distanceOptions}
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
              name="remote"
              label="Open to Remote"
              options={yesNoOptions}
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
  search: state.form.search && state.form.search.values
});

JobsSearchSidebar = reduxForm({
  form: 'search',
  destroyOnUnmount: false,
  enableReinitialize: true
})(JobsSearchSidebar);

export default connect(mapStateToProps)(JobsSearchSidebar);

const JobsSearchSidebarContainer = styled.div``;
