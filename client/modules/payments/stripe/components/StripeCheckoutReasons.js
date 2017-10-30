// CheckoutForm.js
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';

const StripeCheckoutReasons = () => (
  <PricingIncludesContainer>
    <PricingIncludesContent>
      <List>
        <ListItem>
          <ListHeader>Reach top tech talent</ListHeader>
          <ListSubheader>
            Lorem Khaled Ipsum is a major key to success. Lorem Khaled Ipsum is
            a major key to.
          </ListSubheader>
        </ListItem>
        <ListItem>
          <ListHeader>Show case your company amongst the best</ListHeader>
          <ListSubheader>
            Lorem Khaled Ipsum is a major key to success. Lorem Khaled Ipsum is
            a major key to.
          </ListSubheader>
        </ListItem>
        <ListItem>
          <ListHeader>30 days of active listing</ListHeader>
          <ListSubheader>
            Lorem Khaled Ipsum is a major key to success. Lorem Khaled Ipsum is
            a major key to.
          </ListSubheader>
        </ListItem>
      </List>
    </PricingIncludesContent>
  </PricingIncludesContainer>
);

export default StripeCheckoutReasons;

const PricingIncludesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-basis: 50%;
  width: 100%;
  background: #f9f8f7;
  padding: 50px;
  width: 440px;

  ${media.tablet`
    width: 100%;
    padding: 30px;
  `};
`;

const PricingIncludesContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  ${media.desktop`
  padding: 24px;
`};
`;

const List = styled.ul`list-style: none;`;

const ListItem = styled.ul`
  margin-bottom: 38px;
  &:last-child {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 20px;
  `};
`;

const ListHeader = styled.h3`
  font-family: ${props => props.theme.fontFamily.tiempos};
  list-style: none;
  font-size: 32px;
  margin-bottom: 12px;

  ${media.tablet`
    font-size: 26px;
    margin-bottom: 8px;
  `};
`;

const ListSubheader = styled.p`
  list-style: none;
  line-height: 1.6;
  color: ${props => props.theme.colors.grey.mid};
`;
