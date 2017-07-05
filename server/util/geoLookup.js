import geoip from 'geoip-lite';

/**
 * ::1 is the actual IP. It is an ipv6 loopback address (i.e. localhost).
 * If you were using ipv4 it would be 127.0.0.1
 */
export const geoLookup = req => {
  if (req.url !== '/') {
    return;
  }

  let ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // For localhost testing, hardcoding IP
  if (ip === '::1') {
    ip = '50.64.119.139';
  }

  return {
    location: geoip.lookup(ip)
  };
};
