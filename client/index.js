/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/store';
import routes from './routes';
import initServiceWorker from './sw';
import App from './modules/app/containers/App';

// Initialize Servicie Worker register code
// initServiceWorker();

// Initialize store
const store = configureStore(browserHistory, window.__INITIAL_STATE__);

const renderApp = () => {
  render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    document.getElementById('app')
  );
};

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./modules/app/containers/App', renderApp());
}

renderApp();
