import docCookies from './cookies';

/**
 * checkStatus()
 * Handles responses from backend. A clean way of letting errors
 * or non-errors flow into our redux reducers.
 */
export const checkStatus = async res => {
  const body = await res.json();

  /**
   * Throughout the entire backend all errors must be accompanied with a
   * response body of an Array of errors. If that Array contains errors
   * we'll throw the response body.
   */
  const hasErrors = body.errors.length;

  if (hasErrors) throw body;

  return body;
};

export function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  const baseUrl = `${process.env.PROTOCOL}://${process.env.APIHOST}`;
  const endpoint = `/api/v0${adjustedPath}`;

  /**
   * On the server for node it's required to provide absolute paths for all
   * API calls. Also, when it's localhost we want to include the PORT, such as
   * 3000, 8080, 8000. But on the server there's no need to specify the PORT
   */
  if (typeof window === 'undefined') {
    const localAbsolutePath = `${baseUrl}:${process.env.PORT}${endpoint}`;
    const absolutePath = `${baseUrl}${endpoint}`;

    return process.env.APIHOST === 'localhost'
      ? localAbsolutePath
      : absolutePath;
  }
  // Prepend `/api/v0` to relative URL, to proxy to API server.
  return `/api/v0${adjustedPath}`;
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

  return fetch(url, options).then(checkStatus);
}
