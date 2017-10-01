// @flow

const parsePhone = (value: number): string =>
  value.toString().replace(/\D/g, '');

export default parsePhone;
