// @flow
import validator from 'validator';

export default function(value: string): string {
  if (!value) {
    return '';
  }

  return validator.isURL(value.toString()) ? '' : 'Invalid website URL';
}
