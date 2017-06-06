import React from 'react';
import styled from 'styled-components';

/**
 * Used as a container around the Next, Create, and
 * back buttons within the main application forms
 */
export const FormFooter = props => {
  /**
   * We are checking to see if props.children is an array
   * of elements or simply an object of a single element.
   * If there are multiple children we style it so the buttons
   * have space-between
   */
  return (
    <FormFooterContainer
      multipleChildren={Array.isArray(props.children)}
      isUpload={props.isUpload}
    >
      {props.children}
    </FormFooterContainer>
  );
};

export default FormFooter;

const FormFooterContainer = styled.div`
  position: absolute;
  width: ${props => (props.isUpload ? '100%' : '52.5%')};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.multipleChildren ? 'space-between' : 'flex-end')};
  bottom: 0;
  background: #fff;
`;
