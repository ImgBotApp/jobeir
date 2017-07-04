import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi, reqHeaders } from '../../../utils/api';
import {
  SERVER_AUTH_REQUEST,
  SERVER_AUTH_SUCCESS,
  SERVER_AUTH_FAILURE
} from '../ducks';

import { CALL_API } from 'redux-api-middleware';

export function serverAuth(req) {
  const endpoint = 'http://localhost:8000/api/v0/auth';
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
