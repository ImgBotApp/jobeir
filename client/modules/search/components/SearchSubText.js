import React from 'react';
import styled from 'styled-components';

const SearchSubText = () =>
  <SearchSubTextContainer>
    <SearchSubTextText>
      all job postings have agreed to our diversity and inclusion policy
    </SearchSubTextText>
  </SearchSubTextContainer>;

export default SearchSubText;

const SearchSubTextContainer = styled.div`
  text-align: center;
  margin: 25px auto 0;
`;

const SearchSubTextText = styled.p`
  color: #95989A;
`;
