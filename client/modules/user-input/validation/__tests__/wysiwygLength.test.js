import wysiwygLength from '../wysiwygLength';

const wysiwgInput = {
  blocks: [{ text: 'hello' }],
};

describe('[User Input]', () => {
  describe('wysiwygLength validation', () => {
    it('should return an empty string if no value is passed in', () => {
      expect(wysiwygLength(10)()).toEqual('');
    });
    it('should return an error indicating the minimum required characters', () => {
      expect(wysiwygLength(10)(wysiwgInput)).toEqual(
        'Your description must contain 5 more characters',
      );
    });
    it('should return an empty string if more characters are passed in than required', () => {
      expect(wysiwygLength(5)(wysiwgInput)).toEqual('');
    });
  });
});
