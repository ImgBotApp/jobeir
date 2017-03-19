import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }
  
  return validator.isMobilePhone(value) ? '' : 'Invalid phone number';
}
