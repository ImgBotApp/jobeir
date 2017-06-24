import React from 'react';
import styled from 'styled-components';

import SearchForm from '../../user-input/forms/form/search/SearchFrom';

const Search = () => (
  <SearchContainer>
    <SearchForm />
  </SearchContainer>
);

export default Search;

const SearchContainer = styled.div`
  display: flex;
`;
