import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import FormFooter from '../../components/FormFooter';
import { BackButton, SubmitButton, Upload } from '../../../inputs/input';
import { required } from '../../../validation';

class CompanyLogo extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit() {
    console.log('fired');
  }

  render() {
    const { company, handleSubmit, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={company.errors}
        theme="marble"
      >
        <FormHeader text={`Add your company logo`} />
        <Field
          name="logo"
          label="Company logo"
          validate={[required]}
          component={Upload}
        />
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
  company: state.company
});

CompanyLogo = reduxForm({
  form: 'company-upload',
  destroyOnUnmount: false
})(CompanyLogo);

export default connect(mapStateToProps)(CompanyLogo);
