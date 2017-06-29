import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../user-input/forms/form/search/SearchFrom';
import SearchSubText from '../components/SearchSubText';

const Search = () =>
  <SearchContainer>
    <SearchForm />
    <SearchSubText />
  </SearchContainer>;

export default Search;

const SearchContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
