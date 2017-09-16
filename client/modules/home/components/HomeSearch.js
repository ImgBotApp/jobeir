// @flow
import React from 'react';
import styled from 'styled-components';
import SearchForm from '../../user-input/forms/form/search/SearchForm';
import HomeSearchSubText from '../components/HomeSearchSubText';

const HomeSearch = () =>
  <HomeSearchContainer>
    <SearchForm />
    <HomeSearchSubText />
  </HomeSearchContainer>;

export default HomeSearch;

const HomeSearchContainer = styled.div`margin: 0 auto;`;
