import minLength from '../minLength';

describe('[User Input]', () => {
  describe('minLength validation', () => {
    it('should return an empty string if no value is passed in', () => {
      expect(minLength(5)()).toEqual('');
    });
    it('should return an error indicating the minimum required characters', () => {
      expect(minLength(3)('h')).toEqual('Minumum of 3 characters required');
    });
    it('should return an empty string if more characters are passed in than required', () => {
      expect(minLength(3)('hello')).toEqual('');
    });
  });
});
