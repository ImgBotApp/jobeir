import React from 'react';

/**
 * A wrapper around form Form fields that will act as
 * a utility to enable streamlined labeling, styling,
 * and error handling
 */
export const FormWrapper = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  );
};

export default FormWrapper;
