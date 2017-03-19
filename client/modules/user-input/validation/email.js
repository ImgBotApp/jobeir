import validator from 'validator';

export default function(value) {
  return validator.isEmail(value) ? '' : 'Invalid email address';
}
