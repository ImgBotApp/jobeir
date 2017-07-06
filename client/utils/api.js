import docCookies from './cookies';
import host from '../../server/config/host';

/**
 * checkStatus()
 * Handles responses from backend. A clean way of letting errors
 * or non-errors flow into our redux reducers.
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.json().then(error => {
      throw error;
    });
  }
}

export function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return (
      'http://' + host.apiHost + ':' + host.apiPort + '/api/v0' + adjustedPath
    );
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api/v0' + adjustedPath;
}

/**
 * reqHeaders()
 * Formats the headers for the API request. Wil take care of
 * upload formatting or making sure to indicate the correct
 * content-type for the request.
 */
export function reqHeaders(header, cookies = {}) {
  let SID;

  if (cookies.SID) {
    SID = cookies.SID;
  } else {
    SID = docCookies.getItem('SID');
  }

  const headers = {
    Accept: 'application/json'
  };

  // For image uploading, need to pass entype header
  if (header === 'multipart/form-data') {
    headers.enctype = header;
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (SID) {
    headers.Authorization = `Bearer ${SID}`;
  }

  return headers;
}

/**
 * reqBody()
 * Formats the body for the API call.
 * Will handle upload formatting, POST body, and no body
 * for GET calls.
 */
export function reqBody(method, payload, header) {
  let body;

  if (method.toUpperCase() !== 'GET' && header !== 'multipart/form-data') {
    body = JSON.stringify(payload);
  }

  if (header === 'multipart/form-data') {
    body = payload;
  }

  return body;
}

/**
 * fetchApi()
 * This helper method is used throughout the application to format and
 * asynchronous API calls to the backend. This function is mostly imported
 * into Redux Sagas.
 */
export function fetchApi(method, endpoint, payload = {}, header, req = {}) {
  const url = formatUrl(endpoint);
  const options = {};

  options.method = method;
  options.headers = reqHeaders(header, req.cookies);
  options.body = reqBody(method, payload, header);

  return fetch(url, options).then(checkStatus).then(res => res.json());
}
