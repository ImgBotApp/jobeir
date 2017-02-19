import App from '../modules/app/containers/App';

// Polyfill for require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

// Polyfill for System.import
const System = {
  import: path => Promise.resolve(require(path))
};

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
export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('../modules/home/containers/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/login',
      getComponent(location, cb) {
        System.import('../modules/login/containers/Login')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/signup',
      getComponent(location, cb) {
        System.import('../modules/signup/containers/Signup')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ]
};
