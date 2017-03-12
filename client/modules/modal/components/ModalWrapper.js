import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../ducks';

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleEscapeKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKey, true);
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
    const {
      modalFull,
      modalAction,
      modalSize,
      className,
      children,
      modalText
    } = this.props;

    return (
      <div className={`Modal ${modalFull ? '' : 'Modal--'}`}>
        <div className="Modal__background" onClick={modalAction}></div>
        <div className={`Modal__size ${modalSize ? `Modal__size--${modalSize}` : ''}`}>
          <div className={`Modal__body ${className ? className : ''}`}>
            <div className="Modal__body-top">
              {modalAction && <div onClick={modalAction} className="Modal__actions">×</div>}
            </div>
            {children || null}
            {modalText ? <p className="Modal__text">{modalText}</p> : null}
          </div>
        </div>
      </div>
    );
  }
};

export default connect()(ModalWrapper);
