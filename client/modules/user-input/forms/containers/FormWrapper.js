// @flow
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import FormError from '../components/FormError';
import FormThemes from '../../themes';

/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
const FormWrapper = (props: {
  children: any,
  formErrors: Array<{}>,
  formSubmit: Function,
  handleSubmit: Function,
  theme: string
}) => {
  const {
    children,
    formErrors = [],
    formSubmit,
    handleSubmit,
    theme = 'opal'
  } = props;

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
};

export default FormWrapper;

const StyledForm = styled.form`
  margin-bottom: ${props => props.theme.form.marginBottom};
  padding-bottom: ${props => props.theme.form.paddingBottom};

  ${media.tablet`
    margin-bottom: ${props => props.theme.form.tablet.marginBottom};
  `};
`;
