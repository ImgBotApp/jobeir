const initServiceWorker = () => {
  if (
    'serviceWorker' in navigator &&
    !window.location.host.includes('localhost')
  ) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
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
