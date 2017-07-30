// @flow
export default function(minLength: number): Function {
  return function validateMinLength(value: string): string {
    if (!value) {
      return '';
    }

    return value.toString().length >= minLength
      ? ''
      : `Minumum of ${minLength} characters required`;
  };
}
