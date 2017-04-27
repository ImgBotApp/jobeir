/**
 * fireEscapeKeypress
 * Utility used to close modals by manually dispatching
 * an Escape (ESC) keypress to the window.
 * The modal component has an eventlistener waiting!
 */
export const fireEscapeKeypress = () => {
  const event = new Event('keydown');
  event.key = 'Escape';
  event.keyCode = event.key.charCodeAt(0);
  event.which = event.keyCode;

  window.dispatchEvent(event);
};

export default fireEscapeKeypress;
