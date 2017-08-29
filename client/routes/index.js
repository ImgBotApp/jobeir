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
  throw new Error(`Dynamic page loading failed: ${err}`);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}

// Ned to add routes here to allow development routes to work correctly
if (process.env.NODE_ENV === 'development') {
  require('../modules/home/containers/Home');
  require('../modules/jobs/search/containers/JobsSearch');
  require('../modules/jobs/posting/containers/JobsPosting');
  require('../modules/auth/containers/Redirect');
  require('../modules/auth/login/containers/Login');
  require('../modules/auth/signup/containers/Signup');
  require('../modules/auth/reset/containers/Reset');
  require('../modules/auth/password/containers/Password');
  require('../modules/account/shell/containers/Shell');
  require('../modules/account/create/step/containers/Step');
  require('../modules/account/profile/containers/Profile');
  require('../modules/account/create/step/containers/StepComplete');
  require('../modules/account/jobs/containers/Jobs');
  require('../modules/account/jobs/posting/containers/JobPosting');
  require('../modules/account/company/containers/Company');
  require('../modules/account/people/containers/People');
  require('../modules/not-found/components/NotFound');
}

// React router setup with code splitting
const routes = (
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
          cb(null, require('../modules/auth/login/containers/Login').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/signup/containers/Signup').default);
        });
      }}
    />
    <Route
      path="/reset"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/reset/containers/Reset').default);
        });
      }}
    />
    <Route
      path="/password/:resetPasswordToken"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/auth/password/containers/Password').default
          );
        });
      }}
    />
    <Route
      path="/jobs"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/jobs/search/containers/JobsSearch').default
          );
        });
      }}
    />
    <Route
      path="/jobs/:jobId"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/jobs/posting/containers/JobsPosting').default
          );
        });
      }}
    />
    <Route
      path="/redirect"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/containers/Redirect').default);
        });
      }}
    />
    <Route
      path="/create/:create/:step(/:companyId)"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/account/create/step/containers/Step').default
          );
        });
      }}
    />
    <Route
      path="/complete/:create(/:companyId)"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/account/create/step/containers/StepComplete')
              .default
          );
        });
      }}
    />
    <Route
      path="/account"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/account/shell/containers/Shell').default
          );
        });
      }}
    >
      <Route
        path="/account/company"
        name="Company"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require('../modules/account/company/containers/Company').default
            );
          });
        }}
      />
      <Route
        path="/account/jobs"
        name="Jobs"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require('../modules/account/jobs/containers/Jobs').default
            );
          });
        }}
      />
      />
      <Route
        path="/account/profile"
        name="Profile"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require('../modules/account/profile/containers/Profile').default
            );
          });
        }}
      />
      <Route
        path="/account/jobs/:jobId"
        name="Job"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require('../modules/account/jobs/posting/containers/JobPostingToggle')
                .default
            );
          });
        }}
      />
      <Route
        path="/account/people"
        name="People"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require('../modules/account/people/containers/People').default
            );
          });
        }}
      />
    </Route>
    <Route
      path="*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/not-found/components/NotFound').default);
        });
      }}
    />
  </Route>
);

function getRoutesArray(obj) {
  const arr = [
    '/api/v0/login',
    '/api/v0/register',
    '/api/v0/reset',
    '/api/v0/password',
    '/api/v0/upload',
    '/api/v0/search/jobs',
    '/favicon.ico',
    new RegExp('\\/api\\/v0\\/jobs\\/[^\\/]+$') // matches /api/v0/jobs/:id
  ];

  (function getIds(obj) {
    for (const x in obj) {
      if (typeof obj[x] === 'object') {
        getIds(obj[x]);
      } else if (x === 'path') {
        arr.push(obj[x]);
      }
    }
  })(obj);

  return arr;
}

export const routesArray = getRoutesArray(routes);

export default routes;
