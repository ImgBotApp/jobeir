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

// Mount into #app
const mountApp = document.getElementById('app');

// Initialize Servicie Worker register code
// initServiceWorker();

// Initialize store
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
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes'); // eslint-disable-line global-require

    renderApp({ routes: nextRoutes });
  });
}
