import fetch from 'whatwg-fetch';
import { checkStatus, fetchApi, reqHeaders } from '../api';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const blob = new Blob();
const fetchResponse = new Response(blob, {
  status: 404,
  body: {
    error: [{ error: 'ERROR', message: 'There as an error' }]
  }
});

describe('[Utility] api', () => {
  describe('checkStatus()', () => {
    // it('should return the response if the status >= 200', () => {
    //   expect(checkStatus({ status: 200 })).toEqual({ status: 200 });
    // });
    // it('should return the response if the status < 300', () => {
    //   expect(checkStatus({ status: 299 })).toEqual({ status: 299 });
    // });
    // it('should throw an error status > 300', () => {
    //   expect(checkStatus(fetchResponse)).toEqual({});
    // });
  });

  describe('reqHeaders()', () => {
    it('should return the Accept and Content-type headers', () => {
      expect(reqHeaders()).toEqual(headers);
    });
  });
});
