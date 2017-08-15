import React from 'react';

export default props => {
  const buttonStyle = {
    margin: '0',
    fontFamily: '"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif',
    display: 'block',
    padding: '10px 16px',
    textDecoration: 'none',
    borderRadius: '3px',
    border: '1px solid',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    background: '#ffffff',
    borderColor: '#5C6AC4',
    backgroundColor: '#5C6AC4',
    color: '#ffffff',
    borderTopWidth: '1px'
  };

  return (
    <div width="100%">
      <a href={props.link} style={buttonStyle}>
        {props.text}
      </a>
    </div>
  );
};
