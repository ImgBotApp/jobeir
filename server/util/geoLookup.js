import geoip from 'geoip-lite';

/**
 * ::1 is the actual IP. It is an ipv6 loopback address (i.e. localhost).
 * If you were using ipv4 it would be 127.0.0.1
 */
export default function geoLookup(req) {
  let ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log('ip');
  console.log(ip);
  // For localhost testing, hardcoding IP
  if (ip === '::1') {
    ip = '50.64.119.139';
  }

  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log('geoip.lookup(ip)');
  console.log(geoip.lookup(ip));
  return {
    location: geoip.lookup(ip)
  };
}
