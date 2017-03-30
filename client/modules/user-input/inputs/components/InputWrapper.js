import React from 'react';
import InputLabel from './InputLabel';
import InputError from './InputError';

/**
 * A wrapper around form input fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const InputWrapper = props => {
  console.log(props);
  return (
    <div>
      {props.label && <InputLabel {...props} />}
      {props.children}
      <InputError {...props} />
    </div>
  );
};

export default InputWrapper;
