import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellDropdown from '../components/ShellDropdown';

class ShellHeader extends Component {
  render() {
    return (
      <ShellHeaderContainer>
        <ShellHeaderHeader>
          {this.props.headerText}
        </ShellHeaderHeader>
        <ShellDropdown />
      </ShellHeaderContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(ShellHeader);

const ShellHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
`;

const ShellHeaderHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;
