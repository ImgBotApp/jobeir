// @flow
import validator from 'validator';

export default function(value: string): string {
  if (!value) {
    return '';
  }

  return validator.isEmail(value.toString()) ? '' : 'Invalid email address';
}
