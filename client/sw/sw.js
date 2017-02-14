export default const initServiceWorker = () => {
  if ('serviceWorker' in navigator && !window.location.host.includes('localhost')) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // Registration was successful
      console.log('🌝', registration.scope); // eslint-disable-line no-console
    }).catch(err => {
      // registration failed :(
      console.log('🌚', err); // eslint-disable-line no-console
    });
  }
};
