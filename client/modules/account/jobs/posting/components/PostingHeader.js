// @flow
import React from 'react';
import styled from 'styled-components';

const PostingHeader = (props: {
  handleEditClick: Function,
  handleDeleteClick: Function
}) => {
  const { handleEditClick, handleDeleteClick } = props;

  return (
    <PostingHeaderContainer>
      <PlainButton onClick={handleEditClick}>Edit Posting</PlainButton>
      <PlainButton onClick={handleDeleteClick}>Delete Posting</PlainButton>
    </PostingHeaderContainer>
  );
};

export default PostingHeader;

const PostingHeaderContainer = styled.div`
  max-width: 700px;
  margin: 0 auto 50px;
`;

const PlainButton = styled.button`
  line-height: 1.6rem;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  padding: 5px 17px;
  margin: 0;
  border-radius: 3px;
  font-size: 14px;
  border: 1px solid #e4e4e4;
  background: linear-gradient(to bottom, #fff, #fafbfc);
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  transition: all 0.2s ease-out;
  transition-property: background, border, box-shadow, color;
  margin-right: 25px;
`;
