import docCookies from './cookies';

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

/**
 * reqHeaders()
 * Formats the headers for the API request. Wil take care of
 * upload formatting or making sure to indicate the correct
 * content-type for the request.
 */
export function reqHeaders(header) {
  const SID = docCookies.getItem('SID');

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
export function fetchApi(method, endpoint, payload = {}, header) {
  const url = `/api/v0${endpoint}`;
  const options = {};

  options.method = method;
  options.headers = reqHeaders(header);
  options.body = reqBody(method, payload, header);

  return fetch(url, options).then(checkStatus).then(res => res.json());
}
