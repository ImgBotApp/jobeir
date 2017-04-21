import required from '../required';

describe('[User Input]', () => {
  describe('required validation', () => {
    it('should return an empty string if a value is passed in', () => {
      expect(required('value')).toEqual('');
    });
    it('should return an error if no value is passed in', () => {
      expect(required()).toEqual('This field is required');
    });
  });
});
