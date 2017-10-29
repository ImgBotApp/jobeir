// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, Select } from '../../../user-input/inputs/input';
import { countryOptions } from '../../../user-input/options/country';

let StripeCardForm = () => (
  <div style={{ display: 'inline-block', width: '100%', marginBottom: '25px' }}>
    <Field
      name="name"
      type="text"
      required
      component={Text}
      label="Full name"
    />
    <Field
      name="address"
      type="text"
      required
      component={Text}
      label="Address"
    />
    <Field
      name="country"
      type="text"
      required
      component={Select}
      label="Country"
      options={countryOptions}
    />
    <Field name="city" type="text" required component={Text} label="City" />
    <Field
      name="state"
      type="text"
      required
      component={Text}
      label="State / Prov"
    />
    <Field
      name="zip"
      type="text"
      required
      component={Text}
      label="Zip / Postal"
    />
  </div>
);

StripeCardForm = reduxForm({
  form: 'stripe',
  forceUnregisterOnUnmount: true
})(StripeCardForm);

export default StripeCardForm;
