import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellDropdown from './ShellDropdown';
import ShellHeaderNav from './ShellHeaderNav';
import ShellLogo from '../components/ShellLogo';

class ShellTopNav extends Component {
  render() {
    const { children, params } = this.props;

    return (
      <ShellTopNavContainer>
        <ShellTopNavLeft>
          <ShellLogo />
        </ShellTopNavLeft>
        <ShellTopNavRight>
          <ShellHeaderNav />
          <ShellDropdown />
        </ShellTopNavRight>
      </ShellTopNavContainer>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ShellTopNav);

const ShellTopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 4px rgba(0,0,0,0.15);
  background: white;
  z-index: 100;
`;

const ShellTopNavLeft = styled.div`

`;

const ShellTopNavRight = styled.div`
  dispaly: flex;
`;
