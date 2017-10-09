// @flow
import React from 'react';
import styled from 'styled-components';

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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
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
  padding: 25px 0 0;
`;

const HomeBannerImage = styled.img`
  width: 85%;
  display: block;
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
`;

const HomeBannerCardContent = styled.div`padding: 55px 125px 65px 107px;`;

const HomeBannerCardHeader = styled.h2`
  font-weight: 900;
  font-size: 42px;
  margin-bottom: 30px;
`;

const HomeBannerCardText = styled.p`
  color: #4f5053;
  font-size: 18px;
  line-height: 1.7;
`;
