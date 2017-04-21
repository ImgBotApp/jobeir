import email from '../email';

describe('[User Input]', () => {
  describe('email validation', () => {
    it('should return an error if an invalid email is used', () => {
      expect(email('email')).toEqual('Invalid email address');
    });
    it('should return an empty string if a valid email is used', () => {
      expect(email('email@gmail.com')).toEqual('');
    });
  });
});
