import docCookies from './cookies';
export const baseUrl = '/api/0';

export const reqHeaders = () => {
  const headers = {};
  const SID = docCookies.getItem('SID');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (SID) {
    headers['Authorization'] = `Bearer ${SID}`;
  }

  return headers;
};
