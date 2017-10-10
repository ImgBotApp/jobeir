// @flow
import React from 'react';
import styled from 'styled-components';

const AutocompleteLogo = () => (
  <AutocompleteLogoContainer>
    <img
      src="/public/static/imgs/google/powered_by_google_on_white_hdpi.png"
      alt="powered by Google logo"
    />
  </AutocompleteLogoContainer>
);

export default AutocompleteLogo;

const AutocompleteLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  text-align: center;

  img {
    height: 18px;
  }
`;
