import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellHeader from './ShellHeader';
import Sidebar from '../../sidebar/containers/Sidebar';
import UserWrapper from '../../../user/containers/UserWrapper';

class Shell extends Component {
  render() {
    return (
      <ShellContainer>
        <Sidebar />
        <ShellContent>
          <ShellHeader />
          <ShellDynamic>
            {this.props.children}
          </ShellDynamic>
        </ShellContent>
      </ShellContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(UserWrapper(Shell));

const ShellContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ShellContent = styled.div`
  padding: 40px 50px;
`;

const ShellDynamic = styled.div`
`;
