import { HIDE_MODAL, SHOW_MODAL, hideModal, showModal } from '../';

const action = {
  type: SHOW_MODAL,
  modalType: 'EXAMPLE_MODAL',
  modalProps: 'dispatch'
};

describe('Modal', () => {
  describe('showModal', () => {
    it('should return the correct modal type and props', () => {
      expect(showModal('EXAMPLE_MODAL', 'dispatch')).toEqual(action);
    });
  });
  describe('hideModal', () => {
    it('should return the type HIDE_MODAL', () => {
      expect(hideModal()).toEqual({ type: HIDE_MODAL });
    });
  });
});
