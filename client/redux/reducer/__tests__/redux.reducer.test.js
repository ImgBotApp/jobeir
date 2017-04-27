import rootReducer, { appReducer } from '../';

const state = {};
const action = {};
const logoutAction = { type: 'LOGOUT_SUCCESS' };

describe('[Reducer]', () => {
  describe('rootReducer', () => {
    it('should return the initial state when LOGOUT_SUCCESS action is completed', () => {
      expect(rootReducer(state, logoutAction)).toEqual(
        appReducer(state, action),
      );
    });
  });
});
