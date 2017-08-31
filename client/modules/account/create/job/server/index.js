import { CALL_API } from 'redux-api-middleware';
import { reqHeaders } from '../../../utils/api';
import {
  SERVER_GET_JOB_REQUEST,
  SERVER_GET_JOB_SUCCESS,
  SERVER_GET_JOB_FAILURE
} from '../ducks';

export function serverGetUser(userId, req) {
  const endpoint = `${process.env.APIHOST}/users/${userId}`;
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_GET_JOB_REQUEST,
        {
          type: SERVER_GET_JOB_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_GET_JOB_FAILURE,
          payload: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}
