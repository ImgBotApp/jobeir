import url from '../url';

describe('[User Input]', () => {
  describe('url validation', () => {
    it('should return an empty string if no value is passed in', () => {
      expect(url()).toEqual('');
    });
    it('should return an error indicating the minimum required characters', () => {
      expect(url('website')).toEqual('Invalid website URL');
    });
    it('should return an empty string if a valid URL is passed in', () => {
      expect(url('https://www.website.com')).toEqual('');
    });
  });
});
