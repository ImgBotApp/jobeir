import React, { Component } from 'react';
import { Form } from 'redux-form';
import styled, { ThemeProvider } from 'styled-components';
import FormError from '../components/FormError';
import FormThemes from '../../themes';

/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
class FormWrapper extends Component {
  render() {
    const {
      children,
      formErrors = [],
      formSubmit,
      handleSubmit,
      theme = 'opal'
    } = this.props;

    /**
     * handleSubmit is passed to the FormWrapper which is just a generic
     * submit function required by redux-form. The formSubmit function is
     * the custom function we would like to fire when the user submits
     * the form when clicking a button type submit
     */
    return (
      <ThemeProvider theme={FormThemes[theme]}>
        <StyledForm onSubmit={handleSubmit(formSubmit)} className="Form">
          {formErrors.length ? <FormError formErrors={formErrors} /> : ''}
          {children}
        </StyledForm>
      </ThemeProvider>
    );
  }
}

export default FormWrapper;

const StyledForm = styled.form`
  margin-bottom: ${props => props.theme.form.marginBottom};
  padding-bottom: ${props => props.theme.form.paddingBottom};
`;
