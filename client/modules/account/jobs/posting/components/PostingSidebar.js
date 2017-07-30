// @flow
import React from 'react';
import styled from 'styled-components';
import PostingMap from '../containers/PostingMap';

const PostingSidebar = (props: { activePosting: {} }) =>
  <PostingSidebarContainer>
    <PostingMap activePosting={props.activePosting} />
  </PostingSidebarContainer>;

export default PostingSidebar;

const PostingSidebarContainer = styled.div`
  margin: 187px 0 0 100px;
  align-self: flex-start;
`;
