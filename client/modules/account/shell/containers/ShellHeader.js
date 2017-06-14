import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class ShellHeader extends Component {
  render() {
    return (
      <ShellHeaderContainer>
        This is the header
        This is the nav
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
`;

const ShellDynamic = styled.div`
  padding: 40px 50px;
`;
