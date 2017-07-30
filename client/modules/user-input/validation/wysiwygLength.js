// @flow
export default function(minLength: number): Function {
  return function validateLength(value: { blocks: Array<{}> }): string {
    if (!value) {
      return '';
    }

    const totalLength: number = value.blocks.reduce(
      (prev: number, curr) => prev + curr.text.length,
      0
    );
    const thisManyMoreChars: number = minLength - totalLength;

    return totalLength >= minLength
      ? ''
      : `Your description must contain ${thisManyMoreChars} more characters`;
  };
}
