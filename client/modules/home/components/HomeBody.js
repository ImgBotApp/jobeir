import React from 'react';
import styled from 'styled-components';

const HomeBody = () =>
  <HomeBodyContainer>
    <Video autoplay loop>
      <source
        src="https://res.cloudinary.com/breather-com/video/upload/v1496780104/zahra_18sec_cleybg.mp4"
        type="video/mp4"
      />
      <source
        src="http://res.cloudinary.com/breather-com/video/upload/ac_none,q_100/v1496780104/zahra_18sec_cleybg.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/breather-com/video/upload/ac_none,q_100/v1496780104/zahra_18sec_cleybg.ogv"
        type="video/ogg"
      />
    </Video>
  </HomeBodyContainer>;

export default HomeBody;

const HomeBodyContainer = styled.div`
  width: 100%;
  display: block;
  padding: 100px 0;
`;

const Video = styled.video`
  width: 85%;
  display: block;
`;
