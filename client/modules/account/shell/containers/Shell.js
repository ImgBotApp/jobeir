// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import UserWrapper from '../../../user/containers/UserWrapper';
import ShellHeader from '../components/ShellHeader';

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
const Shell = (props: { children: any, params: {}, pathname: string }) => {
  const { children, params, pathname } = props;
  const showShellHeader: boolean = !params.jobId;

  return (
    <ShellContainer>
      <ShellContent>
        {showShellHeader &&
          <ShellHeader
            headerText={children.props.route.name}
            params={params}
          />}
        <ShellDynamic>
          {children}
        </ShellDynamic>
      </ShellContent>
    </ShellContainer>
  );
};

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname
});

export default connect(mapStateToProps)(UserWrapper(Shell));

const ShellContainer = styled.div``;

const ShellContent = styled.main`
  margin: 0 auto;
  width: 100%;

  ${media.desktop`
    padding: 0 24px;
  `};
`;

const ShellDynamic = styled.div``;
