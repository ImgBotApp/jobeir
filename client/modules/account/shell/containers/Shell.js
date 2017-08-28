// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserWrapper from '../../../user/containers/UserWrapper';
import ShellHeader from '../components/ShellHeader';
import ShellSidebar from './ShellSidebar';

/**
 * <Shell />
 * The highest level component for the authenticated account section.
 * Shell wraps the sidebar navigation along with all the different
 * account sections.
 *
 * Browser view on desktop
 *_______________________________
 * 
 *      <ShellHeader />
 * ______________________________
 *   
 *      <ShellDynamic>
 *        {children}
 *      </ShellDynamic>
 *
 */
const Shell = (props: { children: any, params: {} }) => {
  const { children, params } = props;

  return (
    <ShellContainer>
      <ShellSidebar />
      <ShellContent>
        <ShellHeader headerText={children.props.route.name} params={params} />
        <ShellDynamic>
          {children}
        </ShellDynamic>
      </ShellContent>
    </ShellContainer>
  );
};

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.account.companies,
  jobs: state.account.jobs
});

export default connect(mapStateToProps)(UserWrapper(Shell));

const ShellContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ShellContent = styled.main`
  padding-left: 245px;
  margin: 0 50px 0 80px;
  width: 100%;
`;

const ShellDynamic = styled.div``;
