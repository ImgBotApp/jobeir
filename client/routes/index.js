import App from '../modules/app/containers/App';

export function errorLoading(err) {
  throw new Error('Dynamic page loading failed: ' + err);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}

// Polyfill for System.import
const System = {
  import: path => Promise.resolve(require(path))
};

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
  ]
};
