// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import ReactGA from 'react-ga';
import IntlWrapper from '../../intl/containers/IntlWrapper';
import routes from '../../../routes';
import css from '../../../styles/fonts/fonts.css';
import { goToTopOfPage } from '../../../utils/scrolling';

/**
 * handleUpdate()
 * On route changes we want to execute Google Analytics tracking
 * and adjusting the scroll position, specifically for the creation
 * process on mobile.
 */
const handleUpdate = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
  goToTopOfPage();
};

export default function App(props: { store: {}, history: {} }) {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <IntlWrapper>
        <StripeProvider apiKey={process.env.STRIPE_PUBLIC}>
          <Router
            render={renderProps => <ReduxAsyncConnect {...renderProps} />}
            history={history}
            routes={routes}
            onUpdate={handleUpdate}
          />
        </StripeProvider>
      </IntlWrapper>
    </Provider>
  );
}
