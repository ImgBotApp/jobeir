import React from 'react';

export const SubmitButton = props => {
  return (
    <button
      type="submit"
      disabled={false}
    >
      {props.buttonText || 'Submit'}
    </button>
  );
};
