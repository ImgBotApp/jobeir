import phoneNumber from '../phoneNumber';

describe('[User Input]', () => {
  describe('phoneNumber validation', () => {
    it('should return an empty string if a phone number is passed in', () => {
      expect(phoneNumber('5146326321')).toEqual('');
    });
    it('should return an error if an invalid phone number is passed in', () => {
      expect(phoneNumber('123')).toEqual('Invalid phone number');
    });
    it('should return an empty string if no value is passed in', () => {
      expect(phoneNumber()).toEqual('');
    });
  });
});
