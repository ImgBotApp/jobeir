import Core from '../modules/core/containers/Core';

export function errorLoading(err) {
  throw new Error('Dynamic page loading failed: ' + err);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}
/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('../modules/home/containers/Home.js');
}

// polyfill
if (typeof System === "undefined") {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}

// react-router setup with code-splitting
export default {
  component: Core,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('../modules/home/containers/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ]
};
