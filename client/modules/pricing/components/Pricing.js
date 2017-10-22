import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AppHead from '../../app/components/AppHead';
import PricingHalfCopy from './PricingHalfCopy';

const Pricing = () => (
  <PricingContainer>
    <AppHead title="Pricing" />
    <PricingAmountContainer>
      <PricingCurrency>$</PricingCurrency>
      <PricingAmount>29</PricingAmount>
      <PricingTerm>per job post</PricingTerm>
    </PricingAmountContainer>
    <PricingHalfCopy />
    {/* <div>45 days of active listing</div>
    <div>Reach the top tech talent in the world.</div>
    <div>Show case your company and brand amongst the best</div> */}
  </PricingContainer>
);

export default Pricing;

const PricingContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  display: block;
  padding: 75px 0 0;
`;

const PricingAmountContainer = styled.div`
  font-family: ${props => props.theme.fontFamily.tiempos};
  display: flex;
  align-items: flex-start;
  padding: 30px 70px;
  border-radius: 3px;
  margin: 0 auto 75px;
`;

const PricingAmount = styled.div`
  font-size: 120px;
  font-weight: 800;
`;

const PricingTerm = styled.div`
  position: relative;
  bottom: 24px;
  left: 10px;
  font-size: 20px;
  align-self: flex-end;
`;

const PricingCurrency = styled.div`
  position: relative;
  top: 24px;
  right: 10px;
  font-size: 30px;
`;
