import queryParams from '../queryParams';

describe('[Utility] queryParams', () => {
  it('should return an empty object if no pathname passed in', () => {
    expect(queryParams()).toEqual({});
  });

  it('should return an object with correct keys and values', () => {
    expect(queryParams('?next=/path/to')).toEqual({ next: '/path/to' });
  });

  it('should return an object with no values when no query params present', () => {
    expect(queryParams('path/to')).toEqual({ 'path/to': '' });
  });
});
