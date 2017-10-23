// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import FormWrapper from '../../containers/FormWrapper';
import { SubmitButton, Text } from '../../../inputs/input';
import { updateCompany } from '../../../../account/create/company/ducks';
import UpdateCompanyFormLocationEdit from './UpdateCompanyFormLocationEdit';
import Autocomplete from '../../../autocomplete/Autocomplete';

class CompanyFormStepThree extends Component {
  formSubmit = (data: {}): void => {
    this.props.dispatch(
      updateCompany(data, this.props.companies.activeCompany._id)
    );
  };

  render() {
    const { companies, handleSubmit, locations } = this.props;

    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={companies.errors}
        theme="account"
      >
        <AutocompleteContainer>
          <Field
            name="fullAddress"
            label="Start typing full address"
            placeholder="123 Main Street"
            component={Text}
            autocomplete={false}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          <Autocomplete id="fullAddress" />
        </AutocompleteContainer>
        {locations.length > 0 && (
          <MultipleLocations>
            Have more than one office? Just type in another address to add it.
          </MultipleLocations>
        )}
        <FieldArray
          name="locations"
          locations={locations}
          component={UpdateCompanyFormLocationEdit}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '50px'
          }}
        >
          <Field
            name="submitButton"
            buttonText="Save"
            component={SubmitButton}
            isSubmitting={companies.isUpdating}
          />
        </div>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('company-edit');

const mapStateToProps = state => ({
  companies: state.account.companies,
  locations: selector(state, 'locations') || []
});

CompanyFormStepThree = reduxForm({
  form: 'company-edit',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CompanyFormStepThree);

export default connect(mapStateToProps)(CompanyFormStepThree);

const MultipleLocations = styled.h3`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 25px;
`;

const AutocompleteContainer = styled.div`position: relative;`;

const InputGoogleAutocompleteList = styled.ul`
  opacity: ${props =>
    (props.active && props.show) || props.isSearching ? 1 : 0};
  position: absolute;
  background: #fff;
  width: 100%;
  top: calc(100% - 4px);
  border-radius: 3px;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
`;

const InputGoogleAutocompleteLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  text-align: center;

  img {
    height: 18px;
  }
`;

const InputGoogleAutocompleteSearching = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  color: #7e7c7c;
`;
