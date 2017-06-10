import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { hideModal } from '../ducks';
import { ExIcon } from '../../../icons/';

class ModalWrapper extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKey, true);
  }

  handleClick() {
    this.props.dispatch(hideModal());
  }

  handleEscapeKey(event) {
    let isEscape = false;

    if ('key' in event) {
      isEscape = event.key === 'Escape';
    } else {
      isEscape = event.keyCode === 27;
    }

    if (isEscape) {
      this.props.dispatch(hideModal());
    }
  }

  render() {
    const { modalFull, modalSize, children } = this.props;

    return (
      <ModalContainer full={modalFull}>
        <ModalBackground onClick={this.handleClick} />
        <ModalAction onClick={this.handleClick}>
          <ExIcon />
        </ModalAction>
        <ModalContent size={modalSize}>
          <ModalBody>
            {children || null}
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    );
  }
}

export default connect()(ModalWrapper);

const FadeInPulse = keyframes`
  0% { opacity: 0; transform: scale(0.8) translateY(15px); }
  50% { opacity: 1; }
  70% { transform: scale(1) translateY(0); }
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
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
  border: 0;
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
  animation: ${FadeInPulse} .3s forwards cubic-bezier(0.8, 0.02, 0.45, 0.91);
`;

const ModalBody = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.44);
  max-width: 520px;
`;

const ModalAction = styled.div`
  position: fixed;
  right: 25px;
  top: 25px;
  cursor: pointer;
`;
