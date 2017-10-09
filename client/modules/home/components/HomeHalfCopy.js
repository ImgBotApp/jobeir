// @flow
import React from 'react';
import styled from 'styled-components';

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
        <HomeHalfHeader>Lorem ipsum up in here and there</HomeHalfHeader>
        <HomeHalfText>
          Lorem Khaled Ipsum is a major key to success. You see the hedges, how
          I got it shaped up? It’s important to shape up your hedges, it’s like
          getting a haircut, stay fresh. To be successful you’ve got to work
          hard, to make history, simple, you’ve got to make it.
        </HomeHalfText>
      </HomeHalf>
    </HomeHalfContainer>
    <HomeHalfContainer>
      <HomeHalf>
        <HomeHalfHeader>Lorem ipsum up in here and there</HomeHalfHeader>
        <HomeHalfText>
          Lorem Khaled Ipsum is a major key to success. You see the hedges, how
          I got it shaped up? It’s important to shape up your hedges, it’s like
          getting a haircut, stay fresh. To be successful you’ve got to work
          hard, to make history, simple, you’ve got to make it.
        </HomeHalfText>
      </HomeHalf>
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
`;

const HomeHalfContainer = styled.div`display: flex;`;

const HomeHalf = styled.div`
  width: 100%;
  display: block;
  padding: 75px 0 0;
  flex: 1;
`;

const HomeHalfHeader = styled.h3`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 900;
`;

const HomeHalfText = styled.p`
  line-height: 1.7;
  font-size: 18px;
`;

const ArtContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
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
