import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';
import {
  BackButton,
  Email,
  Phone,
  Text,
  SubmitButton
} from '../../inputs/input';
import {
  email,
  required,
  phoneNumber,
} from '../../validation';

const parsePhone = value => value.toString().replace(/\D/g, '');

class CompanyFormStepTwo extends Component {
  constructor(props) {
     super(props);
     
     this.formSubmit = this.formSubmit.bind(this);
   }

  formSubmit() {
    this.props.nextPage();
  }

  render() {
    const {
      company,
      companyName,
      handleSubmit,
      previousPage,
    } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader
          text={`How can applicants contact ${companyName}?`}
        />
        <Field
          name="phone"
          label="Phone"
          placeholder="(604) 843-5555"
          validate={[ required, phoneNumber ]}
          parse={parsePhone}
          component={Phone}
        />
        <Field
          name="website"
          label="Company Website"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="email"
          label="Company Email"
          validate={[ email, required ]}
          component={Email}
        />
        <FormFooter>
          <BackButton
            action={previousPage}
            buttonText="Back"
          />
          <Field
            name="submitButton"
            buttonText="Next"
            component={SubmitButton}
          />
        </FormFooter>
      </FormWrapper>
    );
  }
};

const selector = formValueSelector('company')

const mapStateToProps = state => ({
  company: state.company,
  companyName: selector(state, 'name'),
});

CompanyFormStepTwo = reduxForm({
  form: 'company',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
})(CompanyFormStepTwo);

export default connect(mapStateToProps)(CompanyFormStepTwo);