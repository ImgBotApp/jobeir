// @flow
import React from 'react';
import styled from 'styled-components';
import InputLabel from './InputLabel';
import InputError from './InputError';

/**
 * A wrapper around form input fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
const InputWrapper = (props: { label: string, children: any }) => (
  <InputWrapperContainer ui={props.ui}>
    {props.label && <InputLabel {...props} />}
    {props.children}
    <InputError {...props} />
  </InputWrapperContainer>
);

export default InputWrapper;

/**
 * When adding a ui prop to the redux form Field it allows us
 * to override the custom theme per form. Make sure you pass
 * ui an object
 */
const InputWrapperContainer = styled.div`
  display: ${props => props.theme.inputWrapper.display || 'block'};
  align-items: ${props => props.theme.inputWrapper.alignItems || 'initial'};
  max-width: ${props =>
    (props.ui && props.ui.maxWidth) || props.theme.input.maxWidth};
  margin-bottom: ${props => props.theme.inputWrapper.marginBottom || '1rem'};
  border-bottom: ${props => props.theme.inputWrapper.borderBottom || 'none'};
`;
