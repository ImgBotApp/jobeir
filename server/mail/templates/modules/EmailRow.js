import React from 'react';

export default props => {
  const rowStyles = {
    lineHeight: '1.6',
    margin: props.margin || '25px 0 0 0',
    fontSize: props.fontSize || '16px',
    fontWeight: props.fontWeight || 'regular'
  };

  return (
    <div width="100%" style={rowStyles}>
      {props.children}
    </div>
  );
};
