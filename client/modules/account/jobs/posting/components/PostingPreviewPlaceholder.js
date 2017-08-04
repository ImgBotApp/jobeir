// @flow
import React from 'react';
import styled from 'styled-components';

const PostingPreviewPlaceholder = () =>
  <PostingPreviewPlaceholderContainer>
    <PostingPreviewPlaceholderRow />
    <PostingPreviewPlaceholderRow />
    <PostingPreviewPlaceholderRow width="80" />
  </PostingPreviewPlaceholderContainer>;

export default PostingPreviewPlaceholder;

const PostingPreviewPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostingPreviewPlaceholderRow = styled.div`
  height: 14px;
  background: ${props => props.theme.colors.placeholder};
  margin-bottom: 20px;
  width: ${props => (props.width ? `${props.width}%` : '100%')};
`;
