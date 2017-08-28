import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PrimaryNavLinks from '../components/PrimaryNavLinks';

const PrimaryNavAccount = () =>
  <PrimaryNavAccountNavigation>
    <PrimaryNavAccountNavigationContainer>
      <PrimaryNavLinks />
    </PrimaryNavAccountNavigationContainer>
  </PrimaryNavAccountNavigation>;

export default connect()(PrimaryNavAccount);

const PrimaryNavAccountNavigation = styled.nav`flex: 1;`;

const PrimaryNavAccountNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  height: 70px;
  padding-top: 45px;
  margin-right: 50px;
`;
