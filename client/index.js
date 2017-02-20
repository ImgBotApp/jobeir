/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './modules/app/containers/App';
import { configureStore } from './redux/store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./modules/app/containers/App', () => {
    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      mountApp
    );
  });
}