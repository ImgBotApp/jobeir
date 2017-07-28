import React, { Component } from 'react';
import styled from 'styled-components';

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
