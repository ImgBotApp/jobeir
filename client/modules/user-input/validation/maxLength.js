export default function(maxLength) {
  return function(value) {
    if (!value) {
      return '';
    }

    return value.toString().length <= maxLength ? '' : `Maximum of ${maxLength} characters allowed`;
  }
}
