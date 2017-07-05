const initialState = {
  range: [],
  country: '',
  region: '',
  city: '',
  ll: [],
  metro: 0,
  zip: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'PLACE_HOLDER':
      return Object.assign({}, state, {});
    default:
      return state;
  }
};
