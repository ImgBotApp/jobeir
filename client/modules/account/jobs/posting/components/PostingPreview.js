import React from 'react';
import styled from 'styled-components';
import PostingSidebar from './PostingSidebar';
import PostingBody from '../containers/PostingBody';

const PostingPreview = ({ activePosting }) => {
  const activePostingReady = Object.keys(activePosting).length;

  return (
    <PostingPreviewContainer>
      {activePostingReady &&
        <PostingPreviewContent>
          <PostingBody activePosting={activePosting} />
          <PostingSidebar activePosting={activePosting} />
        </PostingPreviewContent>}
    </PostingPreviewContainer>
  );
};

export default PostingPreview;

const PostingPreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1000px;
`;

const PostingPreviewContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
