export default function(minLength) {
  return function(value) {
    if (!value) {
      return '';
    }

    const totalLength = value.blocks.reduce((prev, curr) => prev + curr.text.length, 0);
    const thisManyMoreChars = minLength -  totalLength;

    return totalLength >= minLength ? '' : `Your description must contain ${thisManyMoreChars} more characters`;
  }
}
