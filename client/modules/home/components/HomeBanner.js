// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

const HomeBanner = () => (
  <HomeBannerContainer>
    <HomeBannerImage
      src="/public/static/imgs/home/home-man-looking-at-phone-subway.jpg"
      alt="Man looking at cellphone in subway"
    />
    <HomeBannerHeader>
      <HomeBannerCard>
        <HomeBannerCardContent>
          <HomeBannerCardHeader>
            Helping you find the right job
          </HomeBannerCardHeader>
          <HomeBannerCardText>
            At Jobeir we want you to grow your career with the leading employers
            in the tech industry. Search through and find the best jobs in the
            tech industry today.
          </HomeBannerCardText>
        </HomeBannerCardContent>
      </HomeBannerCard>
    </HomeBannerHeader>
  </HomeBannerContainer>
);

export default HomeBanner;

const HomeBannerContainer = styled.div`
  width: 100%;
  display: block;
  padding-top: 60px;
`;

const HomeBannerImage = styled.img`
  width: 85%;
  display: block;

  ${media.hd`
    width: 100%;
    margin: 0 auto;
  `};
`;

const HomeBannerHeader = styled.div`
  overflow: hidden;
  margin-top: -13%;
  padding-bottom: 30px;
  background: #f9f8f7;
`;

const HomeBannerCard = styled.div`
  background: #fff;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  width: 65%;
  z-index: 1;
  position: relative;

  ${media.hd`
    width: 90%;
    margin: 0 auto;
  `};
`;

const HomeBannerCardContent = styled.div`
  padding: 55px 125px 65px 107px;

  ${media.hd`
    padding: 30px;
  `};
`;

const HomeBannerCardHeader = styled.h2`
  font-weight: 900;
  font-size: 48px;
  margin-bottom: 30px;
  font-family: ${props => props.theme.fontFamily.tiempos};

  ${media.desktop`
    font-size: 34px;
    margin-bottom: 15px;
  `};

  ${media.tablet`
    font-size: 28px;
    margin-bottom: 15px;
  `};
`;

const HomeBannerCardText = styled.p`
  color: #4f5053;
  font-size: 18px;
  line-height: 1.7;

  ${media.desktop`
    font-size: 16px;
  `};
`;
