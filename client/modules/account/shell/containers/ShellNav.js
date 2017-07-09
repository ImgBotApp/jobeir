import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellDropdown from './ShellDropdown';
import ShellHeaderNav from './ShellHeaderNav';
import ShellLogo from '../components/ShellLogo';

class ShellNav extends Component {
  render() {
    const { children, params } = this.props;

    return (
      <ShellNavContainer>
        <ShellNavLeft>
          <ShellLogo />
        </ShellNavLeft>
        <ShellNavRight>
          <ShellNavRightContent>
            <ShellHeaderNav />
            <ShellDropdown />
          </ShellNavRightContent>
        </ShellNavRight>
      </ShellNavContainer>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ShellNav);

const ShellNavContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  height: 75px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  z-index: 100;
`;

const ShellNavLeft = styled.div``;

const ShellNavRight = styled.div`
  display: flex;
  align-items: center;
`;

const ShellNavRightContent = styled.div`
  display: flex;
  align-items: center;
`;
