import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducer';

const enhancer = compose(
  applyMiddleware(apiMiddleware, thunk)
);

export default function configureStore(initialState) {
  return store = createStore(rootReducer(), initialState, enhancer);
}
