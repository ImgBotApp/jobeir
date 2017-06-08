import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import FormRow from '../../components/FormRow';
import {
  BackButton,
  PostalCode,
  SelectSearch,
  SubmitButton,
  Text
} from '../../../inputs/input';
import { required } from '../../../validation';
import { createCompany } from '../../../../create/company/ducks';
import { countryOptions } from '../../options/countries';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'two', label: 'Two' }
];

class CompanyFormStepThree extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.dispatch(createCompany(data, '/create/company/upload'));
  }

  render() {
    const { companies, handleSubmit, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="marble"
      >
        <FormHeader text="Where's your office located?" />
        <Field
          name="country"
          label="Country"
          placeholder="Search Country"
          options={countryOptions}
          validate={[required]}
          component={SelectSearch}
        />
        <div style={{ paddingBottom: '1rem' }} />
        <Field
          name="streetAddress"
          label="Steet Address"
          validate={[required]}
          component={Text}
        />
        <Field
          name="apt"
          label="Apt, Suite, Bldg. (optional)"
          component={Text}
        />
        <FormRow>
          <Field
            name="city"
            label="City"
            validate={[required]}
            component={Text}
          />
          <Field
            name="province"
            label="Province"
            validate={[required]}
            component={Text}
          />
        </FormRow>
        <FormRow>
          <Field
            name="postalCode"
            label="Postal Code"
            validate={[required]}
            component={PostalCode}
          />
        </FormRow>
        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
});

CompanyFormStepThree = reduxForm({
  form: 'company',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CompanyFormStepThree);

export default connect(mapStateToProps)(CompanyFormStepThree);
