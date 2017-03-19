import React from 'react';
import { Form } from 'redux-form';
/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const FormWrapper = props => {
  const {
    handleSubmit,
    formSubmit,
  } = props;

  return (
    <Form onSubmit={props.handleSubmit(formSubmit)}>
      {props.children}
    </Form>
  );
};

export default FormWrapper;
