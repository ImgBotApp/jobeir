import { CALL_API } from 'redux-api-middleware';
import { formatUrl, reqHeaders } from '../../../utils/api';
import {
  SERVER_GET_USER_REQUEST,
  SERVER_GET_USER_SUCCESS,
  SERVER_GET_USER_FAILURE
} from '../ducks';

export function serverGetUser(userId, req) {
  const endpoint = formatUrl(`/users/${userId}`);

  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_GET_USER_REQUEST,
        {
          type: SERVER_GET_USER_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_GET_USER_FAILURE,
          payload: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}
