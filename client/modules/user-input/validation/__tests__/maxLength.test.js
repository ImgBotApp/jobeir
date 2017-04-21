import maxLength from '../maxLength';

describe('[User Input]', () => {
  describe('maxLength validation', () => {
    it('should return an empty string if no value is passed in', () => {
      expect(maxLength(5)()).toEqual('');
    });
    it('should return an error indicating the minimum required characters', () => {
      expect(maxLength(5)('123456')).toEqual('Maximum of 5 characters allowed');
    });
    it('should return an empty string if less characters are passed in than required', () => {
      expect(maxLength(5)('123')).toEqual('');
    });
  });
});
