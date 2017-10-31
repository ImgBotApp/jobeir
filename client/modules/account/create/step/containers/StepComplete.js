// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';
import { Link } from 'react-router';
import UserWrapper from '../../../../user/containers/UserWrapper';
import AppHead from '../../../../app/components/AppHead';
import StepHeader from '../components/StepHeader';
import { FadeIn } from '../../../../../styles/animate';

const StepComplete = (props: {
  params: { create: string, companyId: string }
}) => (
  <StepCompleteContainer>
    <AppHead title="Create jobs" />
    <StepHeader />
    <StepCompleteContent>
      <div>
        <StepCompleteHeader>Next step, create jobs!</StepCompleteHeader>
        <List>
          <ListItem>
            <ListNumber complete>1</ListNumber> Create a company
          </ListItem>
          <ListItem>
            <ListNumber>2</ListNumber> Create jobs
          </ListItem>
          <ListItem>
            <ListNumber>3</ListNumber> Publish jobs
          </ListItem>
        </List>

        <StyledLink to={`/create/job/about/${props.params.companyId}`}>
          Continue
        </StyledLink>
      </div>
      <FadeIn>
        <ArtContainer>
          <SolidBallPurpleLeft />
          <SolidBallPurpleRight />
          <SolidBallPurpleBottom />
          <HollowBallRightTop />
          <HollowBallLeftTop />
          <HollowBallLeftBottom />
        </ArtContainer>
      </FadeIn>
    </StepCompleteContent>
  </StepCompleteContainer>
);

export default UserWrapper(StepComplete);

const StepCompleteContainer = styled.div``;

const StepCompleteContent = styled.div`
  max-width: 960px;
  margin: 46px auto 0;
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.hd`
    max-width: 900px;
    margin-top: 50px;
    padding: 24px 0;
  `};

  ${media.desktop`
    padding: 0 50px;
  `};

  ${media.tablet`
    position: relative;
    width: 100%;
    padding: 0 104px;
    align-items: flex-start;
  `};

  ${media.phablet`
    max-width: 900px;
    padding: 0 74px;
    height: 60px;
  `};

  ${media.phonePlus`
    padding: 12px 36px;
  `};

  ${media.phone`
    padding: 12px 24px;
  `};
`;

const StepCompleteHeader = styled.h1`
  margin-bottom: 30px;

  ${media.phablet`
  font-size: 28px;
`};
`;

const List = styled.ul`
  font-size: 20px;
  line-height: 1.6;
  list-style: none;
  margin-bottom: 100px;

  ${media.tablet`
    margin-bottom: 80px;
  `};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 1.6;
  margin-bottom: 20px;
  font-weight: 600;
`;

const ListNumber = styled.div`
  border: 2px solid ${props => props.theme.colors.purple};
  height: 44px;
  width: 44px;
  color: ${props => (props.complete ? '#fff' : props.theme.colors.purple)};
  background: ${props => (props.complete ? props.theme.colors.purple : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  border-radius: 50%;
  padding: 7px 0px 3px 1px;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
  height: 50px;
  border-radius: 3px;
  outline: none;
  border: none;
  background: #5c6ac4;
  width: 100%;
  max-width: 200px;
  font-size: 18px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const ArtContainer = styled.div`
  position: relative;
  height: 500px;
  width: 500px;

  ${media.tablet`
    display: none;
  `};
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
  height: 340px;
  width: 340px;
`;

const SolidBallPurpleRight = SolidBall.extend`
  right: -20px;
  top: -80px;
  height: 220px;
  width: 220px;
`;

const SolidBallPurpleBottom = SolidBall.extend`
  right: 20px;
  bottom: -80px;
  height: 280px;
  width: 280px;

  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
`;

const HollowBallLeftTop = styled.div`
  position: absolute;
  width: 170px;
  height: 170px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 79px;
  top: -126px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;

const HollowBallRightTop = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  right: -45px;
  top: 41px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;

const HollowBallLeftBottom = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 114px;
  bottom: -57px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.purple};
  }
`;
