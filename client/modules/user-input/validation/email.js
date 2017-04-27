import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }

  return validator.isEmail(value.toString()) ? '' : 'Invalid email address';
}
