// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AuthOAuth from '../../auth/components/AuthOAuth';
import AppHead from '../../app/components/AppHead';

const Pricing = (props: { activeCompany: { _id: string } }) => {
  const { _id } = props.activeCompany;
  const link: string = _id
    ? `/create/job/about/${_id}`
    : '/create/company/about';

  return (
    <PricingContainer>
      <AppHead title="Pricing" />
      <TopHeaderContainer>
        <PricingAmountContainer>
          <PricingAmountContent>
            <PricingCurrency>$</PricingCurrency>
            <PricingAmount>29</PricingAmount>
            <PricingTerm>per job post</PricingTerm>
          </PricingAmountContent>
          <AuthOAuth />
        </PricingAmountContainer>
        <PricingIncludesContainer>
          <PricingIncludesConntent>
            <List>
              <ListItem>
                <ListHeader>Reach top tech talent</ListHeader>
                <ListSubheader>
                  Lorem Khaled Ipsum is a major key to success. They never said
                  winning was easy.
                </ListSubheader>
              </ListItem>
              <ListItem>
                <ListHeader>Show case your company amongst the best</ListHeader>
                <ListSubheader>
                  Lorem Khaled Ipsum is a major key to success. They never said
                  winning was easy.
                </ListSubheader>
              </ListItem>
              <ListItem>
                <ListHeader>30 days of active listing</ListHeader>
                <ListSubheader>
                  Lorem Khaled Ipsum is a major key to success. They never said
                  winning was easy.
                </ListSubheader>
              </ListItem>
            </List>
          </PricingIncludesConntent>
        </PricingIncludesContainer>
      </TopHeaderContainer>
      <ImageContainer>
        <StyledImage
          src="/public/static/imgs/pricing/tech-companies-grey-scale-logos-single-row-light-grey.png"
          alt="Airbnb, Stripe, Shopify, Dropbox, Asana, Slack, Shopify"
        />
      </ImageContainer>
      {/* <div>45 days of active listing</div>
    <div>Reach the top tech talent in the world.</div>
    <div>Show case your company and brand amongst the best</div> */}
    </PricingContainer>
  );
};

const mapStateToProps = state => ({
  activeCompany: state.account.companies.activeCompany
});

export default connect(mapStateToProps)(Pricing);

const PricingContainer = styled.div`
  max-width: 1052px;
  margin: 0 auto;
  width: 100%;
  display: block;
  padding: 75px 0 0;
`;

const TopHeaderContainer = styled.div`
  display: flex;
  position: relative;
  border-radius: 3px;
  margin: 0 auto 50px;
`;

const PricingIncludesContainer = styled.div`
  flex: 1;
  background: #f9f8f7;
`;

const PricingIncludesConntent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 60px 80px 35px;
`;

const List = styled.ul`list-style: none;`;

const ListItem = styled.ul`
  margin-bottom: 50px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ListHeader = styled.h3`
  font-family: ${props => props.theme.fontFamily.tiempos};
  list-style: none;
  font-size: 38px;
  margin-bottom: 12px;
`;

const ListSubheader = styled.p`
  list-style: none;
  line-height: 1.6;
  color: ${props => props.theme.colors.grey.mid};
`;

const PricingAmountContainer = styled.div`
  margin: 40px;
  padding: 30px 50px;
  box-shadow: 0 5px 30px -6px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 2px;
  width: 420px;

  &::before {
    content: '';
    background: #f9f8f7;
    position: absolute;
    top: 0;
    left: 250px;
    height: 100%;
    width: 500px;
    z-index: -1;
  }
`;

const PricingAmountContent = styled.div`
  position: relative;
  display: flex;
  align-self: flex-start;
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 40px;
`;

const PricingAmount = styled.div`
  font-size: 132px;
  font-weight: 800;
  margin-left: 5px;
`;

const PricingTerm = styled.div`
  position: relative;
  bottom: 24px;
  left: 10px;
  font-size: 24px;
  align-self: flex-end;
`;

const PricingCurrency = styled.div`
  position: relative;
  top: 30px;
  font-size: 60px;
`;

const StyledImage = styled.img`width: 100%;`;

const ImageContainer = styled.div`
  display: inline-block;
  margin: 75px auto 150px;
`;

const ArtContainer = styled.div`
  position: relative;
  width: 100%;
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

const SolidBallTop = SolidBall.extend`
  left: -84px;
  top: -20px;
  height: 300px;
  width: 300px;
  z-index: -1;
`;

const HollowBallTop = styled(Link)`
  position: absolute;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  right: 154px;
  bottom: 190px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
  z-index: -1;

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
