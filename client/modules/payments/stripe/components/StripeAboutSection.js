// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text } from '../../../user-input/inputs/input';

let StripeCardSection = () => (
  <div>
    <Field name="stripe.address" type="text" component={Text} label="Address" />
    <Field name="stripe.country" type="text" component={Text} label="Country" />
    <Field name="stripe.city" type="text" component={Text} label="City" />
    <Field
      name="stripe.province"
      type="text"
      placeholder="State / Province"
      component={Text}
      label="State/Prov"
    />
    <Field
      name="stripe.postal"
      type="text"
      component={Text}
      label="Zip/Postal"
      placeohlder="Zip / Postal"
    />
  </div>
);

StripeCardSection = reduxForm({
  form: 'stripe',
  forceUnregisterOnUnmount: true
})(StripeCardSection);

export default StripeCardSection;
