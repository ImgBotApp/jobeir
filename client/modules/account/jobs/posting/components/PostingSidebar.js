import React from 'react';
import styled from 'styled-components';
import PostingMap from '../containers/PostingMap';

const PostingSidebar = ({ activePosting }) => {
  return (
    <PostingSidebarContainer>
      <PostingMap activePosting={activePosting} />
    </PostingSidebarContainer>
  );
};

export default PostingSidebar;

const PostingSidebarContainer = styled.div`
  margin: 187px 0 0 100px;
  align-self: flex-start;
`;
