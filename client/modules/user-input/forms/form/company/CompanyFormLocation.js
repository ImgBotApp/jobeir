import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, change, arrayPush } from 'redux-form';
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

const renderLocations = ({ fields }) => {
  return (
    <ul>
      {fields.map((location, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Location"
            onClick={() => fields.remove(index)}
          />
          <h4>Address #{index + 1}</h4>
          <Field
            name={`${location}.unit`}
            type="text"
            component={Text}
            label="Unit"
          />
          <Field
            name={`${location}.street_number`}
            type="text"
            component={Text}
            label="Street Number"
          />
          <Field
            name={`${location}.route`}
            type="text"
            component={Text}
            label="Street Address"
          />
          <Field
            name={`${location}.locality`}
            type="text"
            component={Text}
            label="City"
          />
          <Field
            name={`${location}.administrative_area_level_1`}
            type="text"
            component={Text}
            label="Province/State"
          />
          <Field
            name={`${location}.country`}
            type="text"
            component={Text}
            label="Country"
          />
          <Field
            name={`${location}.postal_code`}
            type="text"
            component={Text}
            label="Postal Code / Zip"
          />
        </li>
      ))}
    </ul>
  );
};

class CompanyFormStepThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showManualAddressInputs: false,
      locations: []
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    const addressInput = document.getElementById('fullAddress');
    const autocomplete = new google.maps.places.Autocomplete(addressInput);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const html = place.adr_address;
      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };
      const address = {
        street_number: '',
        route: '',
        locality: '',
        administrative_area_level_1: '',
        country: '',
        postal_code: ''
      };

      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          address[addressType] = val;
        }
      }

      this.props.dispatch(change('company', 'fullAddress', ''));
      this.props.dispatch(arrayPush('company', 'locations', address));
      this.setState({
        locations: this.state.locations.concat([{ address, html }])
      });
    });
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

        {this.state.showManualAddressInputs
          ? <div>
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
            </div>
          : <Field
              name="fullAddress"
              label="Type Full Address..."
              component={Text}
            />}

        {this.state.locations.map(location => (
          <div
            style={{
              marginBottom: '1rem',
              fontWeight: '600',
              padding: '18px',
              borderRadius: '3px',
              width: '100%',
              background: '#f9f8f7'
            }}
            dangerouslySetInnerHTML={{ __html: location.html }}
          />
        ))}
        <FieldArray name="locations" component={renderLocations} />

        <FormFooter>
          <BackButton action={prevPage} buttonText="Back" />
          <Field
            name="submitButton"
            buttonText="Next"
            disabled={this.state.locations.length === 0}
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
