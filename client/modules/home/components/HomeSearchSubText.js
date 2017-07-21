import React from 'react';
import styled from 'styled-components';

const HomeSerachSubText = () =>
  <HomeSerachSubTextContainer>
    <HomeSerachSubTextText>
      all job postings have agreed to our diversity and inclusion policy
    </HomeSerachSubTextText>
  </HomeSerachSubTextContainer>;

export default HomeSerachSubText;

const HomeSerachSubTextContainer = styled.div`
  text-align: center;
  margin: 25px auto 0;
`;

const HomeSerachSubTextText = styled.p`color: #95989a;`;
