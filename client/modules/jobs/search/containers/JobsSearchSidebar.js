// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import queryString from 'query-string';
import { Radio } from '../../../user-input/inputs/input';
import { marble } from '../../../user-input/themes/marble-theme';

const jobTypes: Array<{ name: string, value: string }> = [
  { name: 'Full-time', value: 'Full-time' },
  { name: 'Part-time', value: 'Part-time' },
  { name: 'Contractor', value: 'Contractor' },
  { name: 'Freelance', value: 'Freelance' },
  { name: 'Intern', value: 'Intern' },
  { name: 'Volunteer', value: 'Volunteer' }
];

const distanceOptions: Array<{ name: string, value: string }> = [
  { name: '10 km', value: '10 km' },
  { name: '50 km', value: '50 km' },
  { name: '100 km', value: '100 km' },
  { name: '200 km', value: '200 km' }
];

const companySizeOptions: Array<{ name: string, value: string }> = [
  { name: '1 - 9', value: '1 - 9' },
  { name: '10 - 49', value: '10 - 49' },
  { name: '50 - 149', value: '50 - 149' },
  { name: '150 - 499', value: '150 - 499' },
  { name: '500 - 999', value: '500 - 999' },
  { name: '1000 +', value: '1000 +' }
];

const yesNoOptions: Array<{ text: string, value: string }> = [
  { name: 'Yes', value: 'Yes' },
  { name: 'No', value: 'No' }
];

class JobsSearchSidebar extends Component {
  render() {
    return (
      <JobsSearchSidebarContainer>
        <ThemeProvider theme={marble}>
          <div>
            <div>Salary</div>
            <div>Distance</div>

            <Field
              name="employmentType"
              options={distanceOptions}
              type="list"
              component={Radio}
            />
            <div>Job Type</div>
            <Field
              name="employmentType"
              options={jobTypes}
              type="list"
              component={Radio}
            />
            <div>Company Size</div>
            <Field
              name="company.size"
              options={jobTypes}
              options={companySizeOptions}
              type="list"
              component={Radio}
            />
            <div>Equity</div>
            <Field
              name="equity"
              options={yesNoOptions}
              type="list"
              component={Radio}
            />
            <div>Remote</div>
            <Field
              name="remote"
              options={yesNoOptions}
              type="list"
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
  jobs: state.search.jobs
});

JobsSearchSidebar = reduxForm({
  form: 'search',
  destroyOnUnmount: false
})(JobsSearchSidebar);

export default connect(mapStateToProps)(JobsSearchSidebar);

const JobsSearchSidebarContainer = styled.div``;
