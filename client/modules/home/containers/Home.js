// @flow
import React from 'react';
import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';
import HomeBanner from '../components/HomeBanner';
import HomeFeatured from '../components/HomeFeatured';

const Home = () => (
  <HomeContainer>
    <HomeHeader />
    <HomeBanner />
    <HomeFeatured />
  </HomeContainer>
);

export default Home;

const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
