import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }
  
  return validator.isNumeric(value.toString()) ? '' : 'Numeric error';
}
