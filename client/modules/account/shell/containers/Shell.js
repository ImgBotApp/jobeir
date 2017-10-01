// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import UserWrapper from '../../../user/containers/UserWrapper';
import AppHead from '../../../app/components/AppHead';
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
  const { children, params } = props;
  const showShellHeader: boolean = !params.jobId;

  return (
    <ShellContainer>
      <AppHead title="Account" />
      <ShellContent>
        {showShellHeader && (
          <ShellHeader headerText={children.props.route.name} params={params} />
        )}
        <ShellDynamic>{children}</ShellDynamic>
      </ShellContent>
    </ShellContainer>
  );
};

export default UserWrapper(Shell);

const ShellContainer = styled.div``;

const ShellContent = styled.main`
  margin: 0 auto;
  width: 100%;

  ${media.hd`
    padding: 0 24px;
  `};
`;

const ShellDynamic = styled.div``;
