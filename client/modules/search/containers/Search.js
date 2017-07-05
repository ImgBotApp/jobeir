import React, { Component } from 'react';
import styled from 'styled-components';
import SearchForm from '../../user-input/forms/form/search/SearchFrom';
import SearchSubText from '../components/SearchSubText';

class Search extends Component {
  render() {
    return (
      <SearchContainer>
        <SearchForm />
        <SearchSubText />
      </SearchContainer>
    );
  }
}
export default Search;

const SearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
