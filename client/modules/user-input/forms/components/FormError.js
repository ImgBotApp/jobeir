import React from 'react';

export const FormError = props => {
  return (
    <div>
      {
        props.formErrors.map(error => {
          return (
            <div key={error.error}>{error.message}</div>
          );
        })
      }
    </div>
  );
};

export default FormError;
