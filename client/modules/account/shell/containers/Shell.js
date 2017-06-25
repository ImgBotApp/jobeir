import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellHeader from '../components/ShellHeader';
import Sidebar from '../../sidebar/containers/Sidebar';
import UserWrapper from '../../../user/containers/UserWrapper';

/**
 * <Shell />
 * The highest level component for the authenticated account section.
 * Shell wraps the sidebar navigation along with all the different
 * account sections.
 *
 *Browser view on desktop
 *_______________________________
 *     |
 *  S  |     <ShellHeader />
 *  I  |_________________________
 *  D  |  
 *  E  |     <ShellDynamic>
 *  B  |      {children}
 *  A  |     </ShellDynamic>
 *  R  |
 *     |
 */
class Shell extends Component {
  render() {
    const { children, params } = this.props;

    return (
      <ShellContainer>
        <Sidebar />
        <ShellContent>
          <ShellHeader headerText={children.props.route.name} params={params} />
          <ShellDynamic>
            {children}
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
  min-height: 100vh;
`;

const ShellContent = styled.div`
  width: 100%;
  padding: 40px 50px;
`;

const ShellDynamic = styled.div`
`;
