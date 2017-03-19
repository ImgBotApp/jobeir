import React from 'react';

export const InputError = props => {
  const { meta } = props;
  const showError = meta.touched && meta.error && meta.invalid;

  return (
    <div>
      {showError ? meta.error : ''}
    </div>
  );
};

export default InputError;
