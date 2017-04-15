import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }

  return validator.isURL(value.toString()) ? '' : 'Invalid website URL';
}
