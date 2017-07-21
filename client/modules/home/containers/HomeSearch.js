import React, { Component } from 'react';
import styled from 'styled-components';
import SearchForm from '../../user-input/forms/form/search/SearchForm';
import HomeSearchSubText from '../components/HomeSearchSubText';

class HomeSearch extends Component {
  render() {
    return (
      <HomeSearchContainer>
        <SearchForm />
        <HomeSearchSubText />
      </HomeSearchContainer>
    );
  }
}
export default HomeSearch;

const HomeSearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
