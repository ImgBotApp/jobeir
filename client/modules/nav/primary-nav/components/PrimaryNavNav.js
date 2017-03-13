import React from 'react';
import styled from 'styled-components';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const PrimaryNav = ({ props }) => {
  console.log(props);
  return (
    <Navigation role="navigation">
      {props.children}
    </Navigation>
  );
};

export default PrimaryNav;