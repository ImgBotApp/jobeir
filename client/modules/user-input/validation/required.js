// @flow
export default function(errorString: string): string {
  return errorString ? '' : 'This field is required';
}
