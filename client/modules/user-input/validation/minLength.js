export default function(minLength) {
  return function(value) {
    if (!value) {
      return '';
    }

    return value.toString().length >= minLength
      ? ''
      : `Minumum of ${minLength} characters required`;
  };
}
