// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import throttle from 'lodash/throttle';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducer';
import rootSaga from '../../sagas';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const middleware = [apiMiddleware, sagaMiddleware, logger];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore(state: {} = {}) {
  const initialState = Object.assign({}, state, persistedState);
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  store.subscribe(
    throttle(() => {
      saveState({
        form: store.getState().form
      });
    }),
    800
  );

  return store;
}
