import React from 'react';

export const InputLabel = props => {
  return (
    <label
      htmlFor={props}
      className={props}>
      {props}
    </label>
  );
};

export default InputLabel;
