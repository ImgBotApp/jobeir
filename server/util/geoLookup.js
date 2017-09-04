import geoip from 'geoip-lite';

/**
 * ::1 is the actual IP. It is an ipv6 loopback address (i.e. localhost).
 * If you were using ipv4 it would be 127.0.0.1
 */
export default function geoLookup(req) {
  /**
   * ip address is can be defined by multiple sources. The main reason for this
   * is the difference btewen production and local enviroments. Production is
   * running an nginx reverse proxy that manually sets headers and local is 
   * manually assigned to a Vancouver IP.
   */
  let ip =
    req.headers['X-Real-IP'] ||
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
}
