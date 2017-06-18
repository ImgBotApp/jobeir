import { GET_USER_SUCCESS } from '../../../user/ducks/';
import { SWITCH_ACTIVE_COMPANY_SUCCESS } from '../../../user/ducks/';

export const CHECK_COMPANY_REQUEST = 'CHECK_COMPANY_REQUEST';
export const CHECK_COMPANY_SUCCESS = 'CHECK_COMPANY_SUCCESS';
export const CHECK_COMPANY_FAILURE = 'CHECK_COMPANY_FAILURE';

export const CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST';
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS';
export const CREATE_COMPANY_FAILURE = 'CREATE_COMPANY_FAILURE';

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';

export const UPLOAD_COMPANY_LOGO_REQUEST = 'UPLOAD_COMPANY_LOGO_REQUEST';
export const UPLOAD_COMPANY_LOGO_SUCCESS = 'UPLOAD_COMPANY_LOGO_SUCCESS';
export const UPLOAD_COMPANY_LOGO_FAILURE = 'UPLOAD_COMPANY_LOGO_FAILURE';

export const initialState = {
  isLoading: false,
  isChecking: false,
  isUploading: false,
  successfulUpload: false,
  activeCompany: {},
  created: [],
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
    case SWITCH_ACTIVE_COMPANY_SUCCESS:
      /**
       * Adding in the active company id to our redux store since
       * it's not stored within the User's model on the server
       */
      const userData = action.payload.data.user;
      return Object.assign({}, state, {
        created: userData.companies,
        activeCompany: {
          ...userData.activeCompany,
          _id: userData.companies.find(
            company => company.name === userData.activeCompany.name
          )._id
        }
      });
    case CREATE_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        created: [...state.created, action.payload.data.company]
      });
    case CREATE_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors.errors
      });
    case CHECK_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isChecking: true
      });
    case CHECK_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isChecking: false,
        errors: []
      });
    case CHECK_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isChecking: false,
        errors: action.errors.errors
      });
    case UPLOAD_COMPANY_LOGO_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      });
    case UPLOAD_COMPANY_LOGO_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        successfulUpload: true,
        errors: []
      });
    case UPLOAD_COMPANY_LOGO_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        errors: action.errors.errors
      });
    default:
      return state;
  }
};

export const createCompany = (data, redirectPathname) => ({
  type: CREATE_COMPANY_REQUEST,
  payload: { data, redirectPathname }
});

export const checkCompany = data => ({
  type: CHECK_COMPANY_REQUEST,
  payload: { data }
});

export const updateCompany = data => ({
  type: UPDATE_COMPANY_REQUEST,
  payload: { data }
});

export const uploadCompanyLogo = (formData, companyId) => ({
  type: UPLOAD_COMPANY_LOGO_REQUEST,
  payload: { formData, companyId }
});
