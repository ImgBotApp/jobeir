const initServiceWorker = () => {
  if (
    'serviceWorker' in navigator &&
    !window.location.host.includes('localhost')
  ) {
    navigator.serviceWorker
      .register('/public/static/dist/client/sw.js')
      .then(registration => {
        // Registration was successful
        console.log('👋 service worker'); // eslint-disable-line no-console
      })
      .catch(err => {
        // registration failed :(
        console.log('😔', err); // eslint-disable-line no-console
      });
  }
};
export default initServiceWorker;
