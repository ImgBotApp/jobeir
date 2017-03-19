import React from 'react';

export const InputLabel = props => {
  return (
    <div>
      <label htmlFor={props.input.name}>
        {props.label}
      </label>
    </div>
  );
};

export default InputLabel;
