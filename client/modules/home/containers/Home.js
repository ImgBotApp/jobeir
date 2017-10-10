// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';
import HomeHeader from '../components/HomeHeader';
import HomeBanner from '../components/HomeBanner';
import HomeFeaturedJobs from '../components/HomeFeaturedJobs';
import HomeHalfCopy from '../components/HomeHalfCopy';

const Home = () => (
  <HomeContainer>
    <AppHead title="The Best Jobs in Tech" />
    <HomeHeader showHeaderText={true} />
    <HomeBanner />
    <HomeFeaturedJobs />
    <HomeHalfCopy />
    <HomeFooter>
      <HomeHeader />
    </HomeFooter>
  </HomeContainer>
);

export default Home;

const HomeContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const HomeFooter = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 0;
  background: #f9f8f7;

  ${media.desktop`
    background: #fff;
  `};
`;
