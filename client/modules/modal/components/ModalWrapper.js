// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { media } from '../../../styles/breakpoints';
import { hideModal } from '../ducks';
import { ExIcon } from '../../../icons/';

class ModalWrapper extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKey, true);
  }

  handleClick = () => {
    this.closeModal();
  };

  handleEscapeKey = event => {
    let isEscape = false;

    if ('key' in event) {
      isEscape = event.key === 'Escape';
    } else {
      isEscape = event.keyCode === 27;
    }

    if (isEscape) {
      this.closeModal();
    }
  };

  closeModal = () => {
    const { dispatch, pathname } = this.props;
    browserHistory.replace(pathname);
    dispatch(hideModal());
  };

  render() {
    const { bgColor, modalFull, modalSize, children } = this.props;

    return (
      <ModalContainer modalFull={modalFull} bgColor={bgColor}>
        <ModalBackground onClick={this.handleClick} />
        <ModalAction bgColor={bgColor} onClick={this.handleClick}>
          <ExIcon fill={bgColor === 'white' ? '#fe9591' : '#fff'} />
        </ModalAction>
        <ModalContent size={modalSize}>
          <ModalBody bgColor={bgColor}>{children || null}</ModalBody>
        </ModalContent>
      </ModalContainer>
    );
  }
}

const mapStateToProps = state => ({
  pathname:
    (state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname) ||
    ''
});

export default connect(mapStateToProps)(ModalWrapper);

const FadeInPulse = keyframes`
  0% { opacity: 0; transform: scale(0.8) translateY(8px); }
  50% { opacity: 1; }
  70% { transform: scale(1) translateY(0); }
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.bgColor === 'white'
      ? 'rgba(255, 255, 255, 0.94)'
      : 'rgba(0, 0, 0, 0.77)'};
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 900;
  width: 100%;
  padding: 0;
  margin: 0;

  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 0;

  ${media.tablet`
    padding: 50px;
  `};

  ${media.phablet`
  padding: ${props => (props.modalFull ? '0px' : '24px')}`};
`;

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0;
`;

const ModalContent = styled.div`
  transform-origin: bottom center;
  animation: ${FadeInPulse} 0.27s forwards ease;
  width: 100%;

  max-width: ${props =>
    props.size === 'full'
      ? '100%'
      : props.size && props.size.includes('px') ? props.size : '480px'};

  ${media.phablet`
    top: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 0;
  `};
`;

const ModalBody = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: ${props =>
    props.bgColor === 'white'
      ? '0 3px 16px 0 rgba(0,0,0,.24)'
      : '0 2px 6px 0 rgba(0,0,0,.44)'};
  width: 100%;
  margin: 0 auto;

  ${media.phablet`
    box-shadow: none;
`};
`;

const ModalAction = styled.div`
  position: fixed;
  right: 30px;
  top: 12px;
  cursor: pointer;
  z-index: 10;
  background: ${props => (props.bgColor === 'white' ? '#ccc' : '#fff')};
  border-radius: 50%;
  padding: 3px;
  height: 30px;
  width: 30px;
`;
