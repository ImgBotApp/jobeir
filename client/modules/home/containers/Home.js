import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import SearchForm from '../../user-input/forms/form/SearchFrom';
import HomeHeader from '../components/HomeHeader';

const Home = () =>
  <HomeContainer>
    <HomeHeader />
    <SearchForm />
  </HomeContainer>;

export default Home;

const HomeContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;