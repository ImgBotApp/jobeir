import selectRequired from '../selectRequired';

describe('[User Input]', () => {
  describe('selectRequired validation', () => {
    it('should return an empty string if no value is passed in', () => {
      expect(selectRequired('input')).toEqual('');
    });
    it('should return an error indicating the minimum required characters', () => {
      expect(selectRequired()).toEqual('This field is required');
    });
    it('should return an empty string if less characters are passed in than required', () => {
      expect(selectRequired(5)).toEqual('');
    });
  });
});
