import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  change,
  Field,
  FieldArray,
  formValueSelector,
  reduxForm
} from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';
import FormRow from '../components/FormRow';
import { email, required, wysiwygLength } from '../../validation';
import {
  Currency,
  Radio,
  Select,
  SelectSearch,
  Text,
  Wysiwyg,
  SubmitButton
} from '../../inputs/input';
import { jobOptions } from '../options/jobs';
import { FormListRemoveIcon } from '../../../../icons/';

const parseNumber = value => parseInt(value.toString().replace(/\D/g, ''), 10);
const jobTypes = [
  { name: 'Full-time', value: 'Full-time' },
  { name: 'Part-time', value: 'Part-time' },
  { name: 'Contractor', value: 'Contractor' },
  { name: 'Freelance', value: 'Freelance' },
  { name: 'Intern', value: 'Intern' },
  { name: 'Volunteer', value: 'Volunteer' }
];
const yesNoOptions = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' }
];
const renderEmailFields = ({
  fields,
  meta: { touched, error, submitFailed }
}) => (
  <FormListWrapper>
    {fields.map(renderFields)}
    <FormListButton onClick={() => fields.push({})}>
      Add additional email
    </FormListButton>
  </FormListWrapper>
);
const renderFields = (member, index, fields) => (
  <FormListItem key={member}>
    {index > 0 &&
      <FormListRemoveItem onClick={() => fields.remove(index)}>
        <FormListRemoveIcon />
      </FormListRemoveItem>}
    <Field
      name={`${member}.email`}
      label={`${index === 0 ? 'Send applications to the following emails:' : ''}`}
      validate={[email, required]}
      component={Text}
      autoFocus
    />
  </FormListItem>
);

class JobEditFrom extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  buildLocationsDropdown() {
    const { companies } = this.props;
    const activeCompany = companies.created.find(
      company => company._id === companies.activeCompany._id
    );

    return (
      activeCompany &&
      activeCompany.locations.map(location => {
        return {
          name: `${location.street}, ${location.city}, ${location.country}`,
          value: location
        };
      })
    );
  }

  formSubmit() {
    this.props.nextPage();
  }

  render() {
    const { handleSubmit, offersEquity, jobs } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <Field
          name="title"
          label="What's the job title?"
          placeholder="Search titles"
          validate={[required]}
          options={jobOptions}
          component={SelectSearch}
        />
        <div style={{ paddingBottom: '1rem' }} />
        <Field
          label="Describe the role"
          name="description"
          ui={{ maxWidth: '100%' }}
          validate={[required, wysiwygLength(25)]}
          component={Wysiwyg}
        />
        <Field
          name="employmentType"
          label="Employment Type"
          validate={[required]}
          options={jobTypes}
          type="list"
          component={Radio}
        />
        <Field
          name="address"
          label="Where will the employee be working?"
          validate={[required]}
          options={this.buildLocationsDropdown()}
          component={Select}
        />
        <Field
          name="remote"
          label="Is this a remote position?"
          validate={[required]}
          options={yesNoOptions}
          type="yes/no"
          component={Radio}
        />
        <FormRow>
          <Field
            name="salaryMin"
            label="Salary minimum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
          <Field
            name="salaryMax"
            label="Salary maximum"
            placeholder="$"
            validate={[required]}
            parse={parseNumber}
            component={Currency}
          />
        </FormRow>
        <Field
          name="offerEquity"
          label="Do you offer equity?"
          validate={[required]}
          options={yesNoOptions}
          type="yes/no"
          component={Radio}
        />
        {offersEquity === 'Yes' &&
          <FormRow>
            <Field
              name="equityMin"
              label="Equity minimum"
              type="number"
              placeholder="%"
              validate={[required]}
              format={formatPercentage}
              parse={parsePercentage}
              component={Text}
            />
            <Field
              name="equityMax"
              label="Equity maximum"
              type="number"
              placeholder="%"
              validate={[required]}
              format={formatPercentage}
              parse={parsePercentage}
              component={Text}
            />
          </FormRow>}
        <FieldArray name="receivingEmails" component={renderEmailFields} />
        <Field
          name="submitButton"
          buttonText="Update"
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('job-edit');

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs,
  offersEquity: selector(state, 'offerEquity')
});

JobEditFrom = reduxForm({
  form: 'job-edit'
})(JobEditFrom);

export default connect(mapStateToProps)(JobEditFrom);

const FormListWrapper = styled.div`
  padding-top: 1rem;
`;

const FormListItem = styled.div`
  position: relative;
  margin-top: -1rem;
`;

const FormListRemoveItem = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.8);
  border-radius: 50%;
  cursor: pointer;
`;

const FormListButton = styled.div`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.colors.red};
  text-decoration: underline;
  padding-left: 30px;

  &::before {
    content: '+';
    position: absolute;
    left: 0;
    top: -3px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.red};
    height: 16px;
    width: 15px;
    display: flex;
    padding: 2px 0 2px 5px;
    text-align: center;
  }
`;
