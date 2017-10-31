// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { shouldCheckAuth, SESSION_LOADED } from '../../auth/ducks/';
import { serverAuth } from '../../auth/server/';
import { serverGetUser } from '../../user/server/';
import Modal from '../../modal/containers/Modal';
import AppHead from '../../app/components/AppHead';
import AppFooter from '../../app/components/AppFooter';
import Header from '../../header/containers/Header';
import theme from '../theme';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state: {} = getState();

      if (shouldCheckAuth(state)) {
        return dispatch(serverAuth(req)).then(res => {
          if (!res.payload.errors.length) {
            return dispatch(serverGetUser(res.payload.data._id, req));
          }
        });
      }
    }
  }
])
class Core extends Component {
  componentDidMount() {
    /**
     * Need to define our own internal session management flag within
     * redux as asyncConnect is causing a few issues with resetting
     */
    const { dispatch, isLoaded } = this.props;
    if (isLoaded) {
      dispatch({ type: SESSION_LOADED });
    }
  }

  shouldDisplayAppFooter(): boolean {
    const { pathname } = this.props;

    return (
      !pathname.includes('account') &&
      !pathname.includes('create') &&
      !pathname.includes('redirect')
    );
  }

  shouldDisplayHeader(): boolean {
    return !this.props.pathname.includes('create');
  }

  render() {
    const { children, isModalOpen, globalIsLoaded, pathname } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          {globalIsLoaded && <Modal />}
          <CoreContainer pathname={pathname} isModalOpen={isModalOpen}>
            <AppHead />
            {this.shouldDisplayHeader() && <Header />}
            {children}
            {this.shouldDisplayAppFooter() && <AppFooter />}
          </CoreContainer>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  pathname:
    (state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname) ||
    '',
  isLoaded: state.reduxAsyncConnect.loaded,
  isModalOpen: state.modal.modalType,
  globalIsLoaded: state.session.auth.globalIsLoaded
});

export default connect(mapStateToProps)(Core);

const CoreContainer = styled.div`
  background: ${props =>
    props.pathname.includes('jobs') && !props.pathname.includes('account')
      ? // ? '#F4F5F7'
        '#fff'
      : 'transparent'};
  min-height: 100vh;
  filter: blur(${props => (props.isModalOpen ? '3px' : '0px')});
`;

injectGlobal`
  * {
    box-sizing:border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: 
      'Avenir STD',
      Avenir,
      -apple-system,
      BlinkMacSystemFont,
      San Francisco,
      Helvetica Neue,
      Helvetica,
      Ubuntu,
      Roboto,
      Noto,
      Segoe UI,
      Arial,
      sans-serif;
    color: rgba(0,0,0,0.85);
    -webkit-font-smoothing: subpixel-antialiased;
  }
  
  textarea:focus, input:focus{
    outline: none;
  }

  select, input {
    font-family: inherit;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #d9dad9;
    font-weight: 200;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #d9dad9;
    font-weight: 200;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #d9dad9;
    font-weight: 200;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #d9dad9;
    font-weight: 200;
  }

  @font-face{font-family:avenir-bold;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/bold.d8ee249af8ca02024e208e88ecb52990.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/bold.b8d9f485f998b3abda1ad560432f0552.woff) format("woff")}@font-face{font-family:avenir-light;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/light.f6a364902a8a8bdaa1fae1f7de4ae18e.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/light.3dbdcd65208cb012bd8ba8e0bbec8282.woff) format("woff")}@font-face{font-family:avenir-regular;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/regular.457e94a5b665614917d1dc45a13d97b8.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/regular.a17c827d23b2077f3be3824965774bba.woff) format("woff")}@font-face{font-family:avenir-medium;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/medium.24932ad03d1891ed270a4ede16bdf03e.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/medium.6b04d1656ab054b0e3feea2c2eb0355e.woff) format("woff")}@font-face{font-family:avenir-semibold;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/semibold.d42bfc911f5d68722bc0e2bb0f0e46d3.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/semibold.7d6afb9bfc9ae3dda53b3b8feb59c684.woff) format("woff")}@font-face{font-family:avenir-thin;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/thin.401e2177f9c446ac28c8e3e92269080b.woff2) format("woff2"),url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/thin.23288d1e890cc2efd148784fd519fc86.woff) format("woff")}@font-face{font-family:tiempos-regular;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/regular.85a10ef40268eeeb6188bf28835b1668.woff) format("woff")}@font-face{font-family:tiempos-regular-italic;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/regularItalic.afa740d8d1317bb9b3eaaeb06f01a447.woff) format("woff")}@font-face{font-family:tiempos-semibold;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/semibold.a88aba6c50dd85e60de20c1f6648d378.woff) format("woff")}@font-face{font-family:tiempos-semibolditalic;src:url(https://d84m7xss6emf0.cloudfront.net/assets/web/MDgxMDIzZjljNTJm/fonts/semibolditalic.1f8a4ae4f49f091bf884e718fa629a6f.woff) format("woff")}
`;
