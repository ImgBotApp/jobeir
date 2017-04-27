/**
 * queryParams
 * Utility used to return an object containing all the
 * query params as key value pairs.
 * For example, /?query=param would translate to
 * { query: 'param' }
 */
export const queryParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
};

export default queryParams;
