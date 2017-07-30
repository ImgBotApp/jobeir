// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ShellHeader from '../components/ShellHeader';
import UserWrapper from '../../../user/containers/UserWrapper';

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

const ShellContent = styled.div`
  width: 1040px;
  margin: 0 auto;
`;

const ShellDynamic = styled.div``;
