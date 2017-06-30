import React, { Component } from 'react';
import styled from 'styled-components';
import { asyncConnect } from 'redux-async-connect';
import { updateJobFilter } from '../../create/job/ducks/';

// @asyncConnect({
//   lunch: (params, helpers) => Promise.resolve({ id: 1, name: 'Borsch' })
// })
@asyncConnect([
  {
    promise: ({ store: { dispatch } }) => dispatch(updateJobFilter('Pending'))
  }
])
class HomeFeatured extends Component {
  render() {
    return <HomeFeaturedContainer />;
  }
}

export default HomeFeatured;

const HomeFeaturedContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 400px 0;
  background: #fafafa;
`;
