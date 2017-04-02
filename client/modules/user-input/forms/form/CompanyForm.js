import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import {
  Text,
  Select,
  Phone,
  SubmitButton
} from '../../inputs/input/';
import {
  required,
  phoneNumber,
} from '../../validation';
import { createCompany } from '../../../create/company/ducks'

const parsePhone = value => value.toString().replace(/\D/g, '');

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    this.props.dispatch(createCompany(data));
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.company.errors}
        theme="marble"
      >
        <Field
          name="name"
          label="Company Name"
          validate={[ required ]}
          component={Text}
        />
        {
          // <Field
          //   name="companySize"
          //   label="Company Size"
          //   validate={[ required ]}
          //   component={Select}
          // />
        }
        <Field
          name="product"
          label="Product"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="website"
          label="Company Website"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="location"
          label="Location"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="phone"
          label="Phone"
          validate={[ required, phoneNumber ]}
          parse={parsePhone}
          component={Phone}
        />
        <Field
          name="submitButton"
          buttonText="Continue"
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  company: state.company,
});

CompanyForm = reduxForm({
  form: 'company',
})(CompanyForm);

export default connect(mapStateToProps)(CompanyForm);