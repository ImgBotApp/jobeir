// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import IntlWrapper from '../../intl/containers/IntlWrapper';
import routes from '../../../routes';
import css from '../../../styles/fonts/fonts.css';
import { goToTopOfPage } from '../../../utils/scrolling';

export default function App(props: { store: {}, history: {} }) {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <IntlWrapper>
        <Router
          render={renderProps => <ReduxAsyncConnect {...renderProps} />}
          history={history}
          routes={routes}
          onUpdate={goToTopOfPage}
        />
      </IntlWrapper>
    </Provider>
  );
}
