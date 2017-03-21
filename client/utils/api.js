import docCookies from './cookies';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response
      .json()
      .then(error => {
        throw error;
      });
  }
}

export function reqHeaders() {
  const SID = docCookies.getItem('SID');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (SID) {
    headers.Authorization = `Bearer ${SID}`;
  }

  return headers;
};

export function fetchApi(method, endpoint, payload = {}) {
  const url = `/api/v0${endpoint}`;
  const options = {};

  options.method = method;
  options.headers = reqHeaders();

  if (method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json());
};
