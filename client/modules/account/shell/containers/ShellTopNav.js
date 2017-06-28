import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellDropdown from './ShellDropdown';
import ShellHeaderNav from './ShellHeaderNav';
import ShellLogo from '../components/ShellLogo';
import ShellCompanyDropdown from './ShellCompanyDropdown';

class ShellTopNav extends Component {
  render() {
    const { children, params } = this.props;

    return (
      <ShellTopNavContainer>
        <ShellTopNavLeft>
          <ShellLogo />
        </ShellTopNavLeft>
        <ShellTopNavRight>
          <ShellTopNavRightContent>
            <ShellHeaderNav />
            <ShellCompanyDropdown />
            <ShellDropdown />
          </ShellTopNavRightContent>
        </ShellTopNavRight>
      </ShellTopNavContainer>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ShellTopNav);

const ShellTopNavContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  z-index: 100;
`;

const ShellTopNavLeft = styled.div`

`;

const ShellTopNavRight = styled.div`
  display: flex;
  align-items: center;
`;

const ShellTopNavRightContent = styled.div`
  display: flex;
  align-items: center;
`;
