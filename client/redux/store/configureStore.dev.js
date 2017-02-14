import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistState } from 'redux-devtools';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';

const logger = createLogger();
const enhancer = compose(
  applyMiddleware(apiMiddleware, logger),
  persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
);

export default function configureStore(initialState) {
  return createStore(rootReducer(), initialState, enhancer);
}
