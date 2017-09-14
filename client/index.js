/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/store';
import routes from './routes';
import initServiceWorker from './sw';
import App from './modules/app/containers/App';

// Initialize store
// const store = configureStore(window.__INITIAL_STATE__);
// Mount into #app
const mountApp = document.getElementById('app');

// Initialize Servicie Worker register code
// initServiceWorker();

/**
 * Wrapping rendering in react-router's match to avoid a flash of content
 * as the JavaScript code gets loaded in after the server rendered code
 * https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes
 */
// render(
//   <AppContainer>
//     <App store={store} />
//   </AppContainer>,
//   mountApp
// );

const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

const renderApp = renderProps =>
  render(
    <AppContainer>
      <App {...{ store, history, ...renderProps }} />
    </AppContainer>,
    mountApp
  );

match({ history, routes }, (error, redirectLocation, renderProps) =>
  renderApp(renderProps)
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./modules/app/containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./modules/app/containers/App').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      mountApp
    );
  });
}
