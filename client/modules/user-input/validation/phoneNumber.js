import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }

  /**
   * create dynamic localization for validation instead of 
   * hardcoding the currenty US value
   */
  return validator.isMobilePhone(value, 'en-US') ? '' : 'Invalid phone number';
}
