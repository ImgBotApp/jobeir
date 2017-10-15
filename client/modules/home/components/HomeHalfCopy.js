// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

const HomeHalfCopy = () => (
  <HomeHalfCopyContainer>
    <HomeHalfContainer>
      <HomeHalf>
        <ArtContainer>
          <SolidBallPurpleLeft />
          <SolidBallPurpleRight />
          <SolidBallPurpleBottom />
          <HollowBallRightTop />
          <HollowBallLeftTop />
          <HollowBallLeftBottom />
        </ArtContainer>
      </HomeHalf>
      <HomeHalf>
        <HomeHalfNarrow right={true}>
          <HomeHalfHeader>We simplify the job search</HomeHalfHeader>
          <HomeHalfText>
            Our goal is to create a place where you can come to find the best
            tech jobs in the world. All employers must agree to our inclusive
            policy.
          </HomeHalfText>
        </HomeHalfNarrow>
      </HomeHalf>
    </HomeHalfContainer>
    <HomeHalfContainer>
      <HomeHalf>
        <HomeHalfNarrow>
          <HomeHalfHeader>All the best jobs in one place</HomeHalfHeader>
          <HomeHalfText>
            Connect with the best employers in tech and apply to your dream job
            in minutes.
          </HomeHalfText>
        </HomeHalfNarrow>
      </HomeHalf>
      <HomeHalf>
        <ArtContainer rotate={true}>
          <SolidBallPurpleLeft />
          <SolidBallPurpleRight />
          <SolidBallPurpleBottom />
          <HollowBallRightTop />
          <HollowBallLeftTop />
          <HollowBallLeftBottom />
        </ArtContainer>
      </HomeHalf>
    </HomeHalfContainer>
  </HomeHalfCopyContainer>
);

export default HomeHalfCopy;

const HomeHalfCopyContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  display: block;
  padding: 75px 0 0;

  ${media.desktop`
    display: none;
  `};
`;

const HomeHalfContainer = styled.div`display: flex;`;

const HomeHalf = styled.div`
  width: 100%;
  display: block;
  padding: 75px 0 0;
  flex: 1;
  margin-bottom: 50px;
`;

const HomeHalfNarrow = styled.div`
  width: 82%;
  margin: ${props => (props.right ? '0 0 0 auto' : '0 auto 0 0')};
`;

const HomeHalfHeader = styled.h3`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 900;
  font-family: ${props => props.theme.fontFamily.tiempos};
`;

const HomeHalfText = styled.p`
  line-height: 1.7;
  font-size: 18px;
`;

const ArtContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  transform: rotate(${props => (props.rotate ? '42' : '0')}deg);
`;

const SolidBall = styled.div`
  position: absolute;
  border-radius: 50%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
`;

const SolidBallPurpleLeft = SolidBall.extend`
  left: -44px;
  top: 0;
  height: 200px;
  width: 200px;
`;

const SolidBallPurpleRight = SolidBall.extend`
  right: 140px;
  top: -80px;
  height: 140px;
  width: 140px;
`;

const SolidBallPurpleBottom = SolidBall.extend`
  right: 80px;
  bottom: 36px;
  height: 240px;
  width: 240px;

  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
`;

const HollowBallLeftTop = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 54px;
  top: -50px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;

const HollowBallRightTop = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  right: 125px;
  top: 7px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;

const HollowBallLeftBottom = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 114px;
  bottom: 57px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;
