// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import throttle from 'lodash/throttle';

/**
 * Used as a container around the Next, Create, and
 * back buttons within the main application forms
 */
class FormFooter extends Component {
  state: {
    isOverlapped: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = { isOverlapped: false };

    this.throttled = throttle(this.calculateOverlap, 300);
  }

  componentDidMount() {
    this.calculateOverlap();

    document.addEventListener('scroll', this.throttled, true);
    window.addEventListener('resize', this.throttled, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.throttled, true);
    window.removeEventListener('resize', this.throttled, true);
  }

  calculateOverlap = () => {
    const form: {
      top: number,
      left: number,
      right: number,
      bottom: number
    } = document.querySelector('.Form').getBoundingClientRect();
    const footer: {
      top: number,
      left: number,
      right: number,
      bottom: number
    } = document.querySelector('.FormFooter').getBoundingClientRect();

    const isOverlapped = !(
      form.right < footer.left ||
      form.left > footer.right ||
      form.bottom < footer.top ||
      form.top > footer.bottom
    );

    this.setState({ isOverlapped });
  };

  render() {
    const { children } = this.props;

    /**
     * We are checking to see if props.children is an array
     * of elements or simply an object of a single element.
     * If there are multiple children we style it so the buttons
     * have space-between
     */
    return (
      <FormFooterContainer>
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

  ${media.retina`
    width: 900px;
  `};

  ${media.tablet`
    width: 100%;
  `};
`;

const FormFooterCenter = styled.div`
  width: 52.5%;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.multipleChildren ? 'space-between' : 'flex-end'};
  padding: 25px 0 35px;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ebebeb;
  box-shadow: ${props =>
    props.isOverlapped ? '0 -9px 18px -10px rgba(0,0,0,0.18)' : 'none'};

  ${media.tablet`
    width: 100%;
    padding: 0;
  `};
`;
