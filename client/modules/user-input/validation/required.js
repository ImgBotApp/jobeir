export default function(errorString) {
  return errorString ? '' : 'This field is required';

  return function(value) {
    return value ? (errorString ? errorString : 'This field is required') : '';
  };
}
