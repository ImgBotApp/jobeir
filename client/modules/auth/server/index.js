import { CALL_API } from 'redux-api-middleware';
import { formatUrl, reqHeaders } from '../../../utils/api';
import {
  SERVER_AUTH_REQUEST,
  SERVER_AUTH_SUCCESS,
  SERVER_AUTH_FAILURE
} from '../ducks';

export function serverAuth(req) {
  const endpoint = formatUrl('/auth');
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_AUTH_REQUEST,
        {
          type: SERVER_AUTH_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_AUTH_FAILURE,
          payload: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}
