// @flow
import React from 'react';
import styled from 'styled-components';
import AppHead from '../../app/components/AppHead';
import HomeHeader from '../components/HomeHeader';
import HomeBanner from '../components/HomeBanner';
import HomeFeaturedJobs from '../components/HomeFeaturedJobs';
import HomeHalfCopy from '../components/HomeHalfCopy';

const Home = () => (
  <HomeContainer>
    <AppHead title="The Best Jobs in Tech" />
    <HomeHeader />
    <HomeBanner />
    <HomeFeaturedJobs />
    <HomeHalfCopy />
    <HomeHeader />
  </HomeContainer>
);

export default Home;

const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
