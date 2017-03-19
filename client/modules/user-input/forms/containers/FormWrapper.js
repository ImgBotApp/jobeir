import React from 'react';
import { Form } from 'redux-form';
import FormError from '../components/FormError';

/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const FormWrapper = props => {
  const {
    formErrors,
    formSubmit,
    handleSubmit,
  } = props;

  return (
    <Form onSubmit={handleSubmit(formSubmit)}>
      <FormError formErrors={formErrors} />
      {props.children}
    </Form>
  );
};

export default FormWrapper;
