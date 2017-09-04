import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PrimaryNavAccount from './PrimaryNavAccount';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';

const PrimaryNav = props => {
  const { isInAccount } = props;

  return (
    <Navigation>
      {isInAccount
        ? <PrimaryNavAccount />
        : <NavigationContainer>
            <PrimaryNavLogo />
            <PrimaryNavLinks />
          </NavigationContainer>}
    </Navigation>
  );
};

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
  max-width: ${props => props.theme.width.max};
`;
