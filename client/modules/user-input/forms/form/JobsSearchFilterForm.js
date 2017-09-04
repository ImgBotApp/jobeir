// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Text } from '../../inputs/input';
import { SearchIcon } from '../../../../icons/';
import { filter } from '../../themes/search-jobs-filter';

let JobsSearchFilterForm = () =>
  <ThemeProvider theme={filter}>
    <JobsSearchFilterFormContainer>
      <StyledSearchIcon />
      <Field name="search" placeholder="Search jobs" component={Text} />
    </JobsSearchFilterFormContainer>
  </ThemeProvider>;

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs
});

JobsSearchFilterForm = reduxForm({
  form: 'jobs-filter'
})(JobsSearchFilterForm);

export default connect(mapStateToProps)(JobsSearchFilterForm);

const JobsSearchFilterFormContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StyledSearchIcon = styled(SearchIcon)`
  pointer-events: none;
  position: absolute;
  left: 12px;
  fill: #afafaf;
`;
