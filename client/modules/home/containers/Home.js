import React from 'react';
import styled from 'styled-components';
import Link from 'react-router/lib/Link';
import HomeHeader from '../components/HomeHeader';
import HomeBody from '../components/HomeBody';

const Home = () => {
  return (
    <HomeContainer>
      <HomeHeader />
      <HomeBody />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
