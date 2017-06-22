import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Used as a container around the Next, Create, and
 * back buttons within the main application forms
 */
class FormFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { isOverlapped: false };

    this.calculateOverlap = this.calculateOverlap.bind(this);
  }

  componentDidMount() {
    this.calculateOverlap();
    document.addEventListener('scroll', this.calculateOverlap, true);
    window.addEventListener('resize', this.calculateOverlap, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.calculateOverlap, true);
    window.removeEventListener('resize', this.calculateOverlap, true);
  }

  calculateOverlap() {
    const form = document.querySelector('.Form').getBoundingClientRect();
    const footer = document
      .querySelector('.FormFooter')
      .getBoundingClientRect();

    const isOverlapped = !(form.right < footer.left ||
      form.left > footer.right ||
      form.bottom < footer.top ||
      form.top > footer.bottom);

    this.setState({ isOverlapped });
  }

  render() {
    const { children, isUpload } = this.props;

    /**
     * We are checking to see if props.children is an array
     * of elements or simply an object of a single element.
     * If there are multiple children we style it so the buttons
     * have space-between
     */
    return (
      <FormFooterContainer isUpload={isUpload}>
        <FormFooterCenter
          className="FormFooter"
          isOverlapped={this.state.isOverlapped}
          multipleChildren={Array.isArray(children)}
        >
          {children}
        </FormFooterCenter>
      </FormFooterContainer>
    );
  }
}

export default FormFooter;

const FormFooterContainer = styled.div`
  position: fixed;
  width: 960px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
`;

const FormFooterCenter = styled.div`
  width: ${props => (props.isUpload ? '100%' : '52.5%')};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.multipleChildren ? 'space-between' : 'flex-end')};
  padding: 25px 0 35px;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ebebeb;
  box-shadow: ${props => (props.isOverlapped ? '0 -9px 15px -5px rgba(0,0,0,0.09)' : 'none')};
`;
