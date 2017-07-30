// @flow
export default function(maxLength: number): Function {
  return function validateLength(value: string): string {
    if (!value) {
      return '';
    }

    return value.toString().length <= maxLength
      ? ''
      : `Maximum of ${maxLength} characters allowed`;
  };
}
