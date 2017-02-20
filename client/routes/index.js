import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Core from '../modules/core/containers/Core';

// Polyfill for require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export function errorLoading(err) {
  throw new Error('Dynamic page loading failed: ' + err);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}

if (process.env.NODE_ENV === 'development') {
  require('../modules/home/containers/Home');
  require('../modules/login/containers/Login');
  require('../modules/signup/containers/Signup');
}

// React router setup with code splitting
export default (
  <Route path="/" component={Core}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/home/containers/Home').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/login/containers/Login').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/signup/containers/Signup').default);
        });
      }}
    />
    />
  </Route>
);
