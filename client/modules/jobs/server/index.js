import { CALL_API } from 'redux-api-middleware';
import { fetchApi, reqHeaders } from '../../../utils/api';
import {
  SERVER_GET_JOBS_REQUEST,
  SERVER_GET_JOBS_SUCCESS,
  SERVER_GET_JOBS_FAILURE
} from '../ducks';
import queryString from 'query-string';

export function serverGetJobs(queryData, req) {
  const query = queryString.stringify(queryData);
  const endpoint = `http://localhost:8000/api/v0/search/jobs?${query}`;
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      headers: reqHeaders('', req.cookies),
      types: [
        SERVER_GET_JOBS_REQUEST,
        {
          type: SERVER_GET_JOBS_SUCCESS,
          payload: (action, state, response) => response.json().then(res => res)
        },
        {
          type: SERVER_GET_JOBS_FAILURE,
          payload: (action, state, response) => response.json().then(res => res)
        }
      ]
    }
  };
}
