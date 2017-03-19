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

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    console.log({ data });
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.auth.errors}
      >
        <Field
          name="companyName"
          label="Company Name"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="companySize"
          label="Company Size"
          validate={[ required ]}
          component={Select}
        />
        <Field
          name="yourName"
          label="Product"
          validate={[ required ]}
          component={Text}
        />
        <Field
          name="companyWebsite"
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
          component={Phone}
        />
        <Field
          name="submitButton"
          buttonText="Continue"
          validate={[ required ]}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
});

CompanyForm = reduxForm({
  form: 'company',
})(CompanyForm);

export default connect(mapStateToProps)(CompanyForm);