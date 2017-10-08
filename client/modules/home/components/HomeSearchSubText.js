// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

const HomeSerachSubText = () => (
  <HomeSerachSubTextContainer>
    <HomeSerachSubTextText>
      all job postings have agreed to our diversity and inclusion policy
    </HomeSerachSubTextText>
  </HomeSerachSubTextContainer>
);

export default HomeSerachSubText;

const HomeSerachSubTextContainer = styled.div`
  text-align: center;
  margin: 30px auto 0;

  ${media.tablet`margin: 30px 12px 0;`};
`;

const HomeSerachSubTextText = styled.p`
  color: #95989a;
  line-height: 1.5;
`;
