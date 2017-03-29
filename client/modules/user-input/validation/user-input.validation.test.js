import {
  email,
  minLength,
  numeric,
  phoneNumber,
  required,
} from './';

describe('User input', () => {
  describe('email validation', () => {
    it('should return an error if an invalid email is used', () => {
      expect(email('email')).toEqual('Invalid email address');
    });
    it('should return an empty string if a valid email is used', () => {
      expect(email('email@gmail.com')).toEqual('');
    });
  });

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

  describe('required validation', () => {
    it('should return an empty string if a value is passed in', () => {
      expect(required('value')).toEqual('');
    });
    it('should return an error if no value is passed in', () => {
      expect(required()).toEqual('This field is required');
    });
  });

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
