// @flow
const initialState: {
  range: Array<{}>,
  country: string,
  region: string,
  city: string,
  ll: Array<{}>,
  metro: number,
  zip: number
} = {
  range: [],
  country: '',
  region: '',
  city: '',
  ll: [],
  metro: 0,
  zip: 0
};

export default (state: {} = initialState, action: { type?: string } = {}) => {
  switch (action.type) {
    case 'PLACE_HOLDER':
      return Object.assign({}, state, {});
    default:
      return state;
  }
};
