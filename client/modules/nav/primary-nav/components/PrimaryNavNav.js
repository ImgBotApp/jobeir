import React from 'react';
import styled from 'styled-components';

const PrimaryNav = ({ props }) => {
  return (
    <Navigation role="navigation">
      {props.children}
    </Navigation>
  );
};

export default PrimaryNav;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
`;
