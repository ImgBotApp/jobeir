// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import queryString from 'query-string';
import InputWrapper from '../../../user-input/inputs/components/InputWrapper';
import mobile from '../../../user-input/themes/mobile-filter-theme';
import SidebarSearchForm from '../../../user-input/forms/form/search/SidebarSearchForm';
import JobsSearchFilterMobileHeader from '../components/JobsSearchFilterMobileHeader';
import JobsSearchFilterMobileButton from '../components/JobsSearchFilterMobileButton';
import {
  companySizeOptions,
  distanceOptions,
  jobTypeOptions,
  yesNoOptions
} from '../../../user-input/options';

class JobsSearchFilterMobile extends Component {
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
    const updatedQuery = queryString.stringify({
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
    });

    if (isLoaded) {
      browserHistory.replace(`/jobs?${updatedQuery}`);
    }
  };

  render() {
    const { dispatch, jobs: { showMobileFilters } } = this.props;
    return (
      <JobsSearchFilterMobileContainer showMobileFilters={showMobileFilters}>
        <ThemeProvider theme={mobile}>
          <div>
            <JobsSearchFilterMobileHeader dispatch={dispatch} />
            <JobsSearchFilterMobilePadding>
              <ListBorder>
                <SidebarSearchForm isMobileFilter={true} />
              </ListBorder>
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
                last={true}
              />
            </JobsSearchFilterMobilePadding>
            <JobsSearchFilterMobileButton dispatch={dispatch} />
          </div>
        </ThemeProvider>
      </JobsSearchFilterMobileContainer>
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

JobsSearchFilterMobile = reduxForm({
  form: 'search',
  destroyOnUnmount: false,
  enableReinitialize: true
})(JobsSearchFilterMobile);

export default connect(mapStateToProps)(JobsSearchFilterMobile);

const JobsSearchFilterMobileContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: initial;
  background: white;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  transform: translateY(${props => (props.showMobileFilters ? '0' : '100')}vh);
  will-change: transform;
  // This cubic-bezier took a lot of fine tuning :')
  transition: transform 400ms cubic-bezier(0.21, 0.96, 0.38, 1.03);
`;

const JobsSearchFilterMobilePadding = styled.div`
  padding: 32px 24px 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  top: 59px;
  bottom: 77px;
  width: 100%;
  position: absolute;
`;

const ListBorder = styled.div`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;

const Radio = (props: {
  type: string,
  row?: string,
  rowWidth?: number,
  last?: boolean,
  options: Array<{
    value: string,
    text?: string,
    name?: string
  }>,
  input: { value: string, onChange: Function, name: string },
  meta: { touched: boolean, error: boolean, invalid: boolean },
  placeholder: string
}) => {
  const { meta } = props;
  const showError: boolean = meta.touched && meta.error && meta.invalid;

  return (
    <InputWrapper {...props}>
      <RadioCircleListBorder last={props.last}>
        <RadioCircleListContainer>
          {props.options.map(option => (
            <RadioCircleListInputContainer key={option.value}>
              <RadioCircleListInput
                {...props.input}
                type="radio"
                id={props.input.name + option.value}
                name={props.input.name}
                value={option.value}
                showError={showError}
                checked={option.value === props.input.value}
              />
              <RadioCircleListLabel
                showError={showError}
                htmlFor={props.input.name + option.value}
              >
                {option.text || option.name}
              </RadioCircleListLabel>
            </RadioCircleListInputContainer>
          ))}
        </RadioCircleListContainer>
      </RadioCircleListBorder>
    </InputWrapper>
  );
};

Radio.defaultProps = {
  rowWidth: undefined,
  row: ''
};

const RadioCircleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const RadioCircleListBorder = styled.div`
  ${props =>
    !props.last
      ? `
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 10px;`
      : ''};
`;

const RadioCircleListInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
  color: #797979;
  margin-bottom: 20px;
`;

const RadioCircleListInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + label {
    color: ${props => props.theme.colors.purple};
  }

  &:checked + label::before {
    background: ${props => props.theme.colors.purple};
    border-color: ${props => props.theme.colors.purple};
  }

  &:checked + label::after {
    top: 4px;
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    content: '';
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    background: white;
    left: 6px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

const RadioCircleListLabel = styled.label`
  position: relative;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  color: #888888;

  &::before {
    top: -2px;
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    content: '';
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #888888;
    transition: all 200ms ease-in-out;
  }

  &:hover {
    color: ${props => props.theme.colors.purple};
  }

  &:hover::before {
    border-color: ${props => props.theme.colors.purple};
    background: ${props => props.theme.colors.purple};
  }
`;
