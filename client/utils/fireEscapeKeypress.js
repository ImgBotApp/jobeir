export const fireEscapeKeypress = () => {
  const event = new Event("keydown");
  event.key = "Escape";
  event.keyCode = event.key.charCodeAt(0);
  event.which = event.keyCode;

  window.dispatchEvent(event);
}

export default fireEscapeKeypress;