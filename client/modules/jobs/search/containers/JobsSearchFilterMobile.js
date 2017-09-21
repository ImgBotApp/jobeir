// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import queryString from 'query-string';
// import { Radio } from '../../../user-input/inputs/input';
import InputWrapper from '../../../user-input/inputs/components/InputWrapper';
import mobile from '../../../user-input/themes/mobile-filter-theme';
import SidebarSearchForm from '../../../user-input/forms/form/search/SidebarSearchForm';

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
    return (
      <JobsSearchFilterMobileContainer>
        <SidebarSearchForm isMobileFilter={true} />
        <ThemeProvider theme={mobile}>
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
  overflow-y: auto;
  background: white;
  padding: 24px 24px 60px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  transform: translateY(100vh);
  will-change: transform;
  transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Radio = (props: {
  type: string,
  row?: string,
  rowWidth?: number,
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
      <RadioCircleListBorder>
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
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 10px;
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
