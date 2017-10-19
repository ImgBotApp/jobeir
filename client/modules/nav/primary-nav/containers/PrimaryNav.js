import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';

const PrimaryNav = () => (
  <Navigation>
    <NavigationContainer>
      <PrimaryNavLogo />
      <PrimaryNavLinks />
    </NavigationContainer>
  </Navigation>
);

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated,
  isInAccount:
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.pathname.includes('account')
});

export default connect(mapStateToProps)(PrimaryNav);

const Navigation = styled.nav`flex: 1;`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  height: 75px;
  max-width: 1100px;
  padding: 0 24px;

  ${media.tablet`
    height: 60px;
  `};
`;
