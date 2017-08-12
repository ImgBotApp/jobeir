import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PrimaryNavLogo from '../components/PrimaryNavLogo';
import PrimaryNavLinks from '../components/PrimaryNavLinks';
import SearchForm from '../../../user-input/forms/form/search/SearchForm';

const PrimaryNav = props => {
  const { isOnJobs } = props;

  return (
    <Navigation>
      <NavigationContainer>
        <PrimaryNavLogo />
        <PrimaryNavLinks />
      </NavigationContainer>
    </Navigation>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrimaryNav);

const Navigation = styled.nav`flex: 1;`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 26px;
  height: 75px;
  max-width: ${props => props.theme.width.max};
`;
