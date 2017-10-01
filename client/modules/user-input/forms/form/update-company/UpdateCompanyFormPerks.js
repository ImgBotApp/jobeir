// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import FormHeader from '../../components/FormHeader';
import { Checkbox } from '../../../inputs/input';
import { perkOptions } from '../../../options';

class UpdateCompanyFormPerks extends Component {
  formSubmit = (): void => {
    this.props.nextPage();
  };

  render() {
    const { handleSubmit, companies, prevPage } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="account"
      >
        <FormHeader text="The perks and benefits" />
        <Field
          name="perks"
          label="Select all that apply"
          options={perkOptions}
          component={Checkbox}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies
});

UpdateCompanyFormPerks = reduxForm({
  form: 'company',
  destroyOnUnmount: false
})(UpdateCompanyFormPerks);

export default connect(mapStateToProps)(UpdateCompanyFormPerks);
