import React from 'react';
import InputLabel from './InputLabel';
import InputError from './InputError';

/**
 * A wrapper around form input fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const InputWrapper = props => {
  return (
    <div>
      <InputLabel />
      {props.children}
      <InputError />
    </div>
  );
};

export default InputWrapper;
