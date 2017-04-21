import numeric from '../numeric';

describe('[User Input]', () => {
  describe('numeric validation', () => {
    it('should return an empty string if a value is passed in', () => {
      expect(numeric()).toEqual('');
    });
    it('should return an error if a non-integer is passed in', () => {
      expect(numeric('value')).toEqual('Numeric error');
    });
    it('should return an empty string if a an integer is passed in', () => {
      expect(numeric(123)).toEqual('');
    });
  });
});
