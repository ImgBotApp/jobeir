import React from 'react';
import { Form } from 'redux-form';
import { ThemeProvider } from 'styled-components';
import FormError from '../components/FormError';
import FormThemes from '../../themes';

/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const FormWrapper = props => {
  const { formErrors = [], formSubmit, handleSubmit, theme = 'opal' } = props;

  /**
   * handleSubmit is passed to the FormWrapper which is just a generic
   * submit function required by redux-form. The formSubmit function is
   * the custom function we would like to fire when the user submits
   * the form when clicking a button type submit
   */
  return (
    <ThemeProvider theme={FormThemes[theme]}>
      <Form onSubmit={handleSubmit(formSubmit)}>
        {formErrors.length ? <FormError formErrors={formErrors} /> : ''}
        {props.children}
      </Form>
    </ThemeProvider>
  );
};

export default FormWrapper;
