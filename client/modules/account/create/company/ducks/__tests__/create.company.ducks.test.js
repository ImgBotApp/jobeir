import compnayReducer, {
  CHECK_COMPANY_REQUEST,
  CHECK_COMPANY_SUCCESS,
  CHECK_COMPANY_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAILURE,
  createCompany,
  checkCompany,
  initialState
} from '../';

describe('[Ducks Create Company]', () => {
  describe('compnayReducer', () => {
    it('should return the initialState', () => {
      expect(compnayReducer()).toEqual(initialState);
    });

    it('should return the correct state on CHECK_COMPANY_REQUEST', () => {
      const nextState = { isChecking: true };
      const action = { type: CHECK_COMPANY_REQUEST };

      expect(compnayReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on CHECK_COMPANY_SUCCESS', () => {
      const nextState = {
        isChecking: false,
        errors: []
      };
      const action = { type: CHECK_COMPANY_SUCCESS };

      expect(compnayReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on CHECK_COMPANY_FAILURE', () => {
      const nextState = {
        isChecking: false,
        errors: ['error']
      };
      const action = {
        type: CHECK_COMPANY_FAILURE,
        errors: {
          errors: ['error']
        }
      };

      expect(compnayReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on CREATE_COMPANY_REQUEST', () => {
      const nextState = { isCreating: true };
      const action = { type: CREATE_COMPANY_REQUEST };

      expect(compnayReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on CREATE_COMPANY_SUCCESS', () => {
      const nextState = { activeCompany: {}, created: [{}], isCreating: false };

      const action = {
        type: CREATE_COMPANY_SUCCESS,
        payload: {
          data: {
            company: {}
          }
        }
      };

      expect(compnayReducer({ created: [] }, action)).toEqual(nextState);
    });

    it('should return the correct state on CREATE_COMPANY_FAILURE', () => {
      const nextState = {
        isCreating: false,
        errors: ['error']
      };
      const action = {
        type: CREATE_COMPANY_FAILURE,
        errors: {
          errors: ['error']
        }
      };

      expect(compnayReducer({}, action)).toEqual(nextState);
    });
  });

  describe('createCompany', () => {
    it('should return the CREATE_COMPANY_REQUEST action', () => {
      expect(createCompany({})).toEqual({
        payload: { data: {} },
        type: CREATE_COMPANY_REQUEST
      });
    });
  });
  describe('checkCompany', () => {
    it('should return the CHECK_COMPANY_REQUEST action', () => {
      expect(checkCompany({})).toEqual({
        payload: { data: {} },
        type: CHECK_COMPANY_REQUEST
      });
    });
  });
});
