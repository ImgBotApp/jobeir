// @flow

const parseNumber = (value: number): number =>
  parseInt(value.toString().replace(/\D/g, ''), 10);

export default parseNumber;
