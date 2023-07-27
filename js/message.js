import {isEscapeKey} from './util.js';
const body = document.querySelector('body');
let messageElement;
let isOpen = false;

const hideMessage = () => {
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown, { capture: true });
  if (!isOpen) {
    body.classList.remove('modal-open');
  }
  messageElement.removeEventListener('click', onMessageClick);
};

//Функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    hideMessage();
  }
}

function onMessageClick(evt) {
  if (evt.target.closest('.success') || evt.target.closest('.error')){
    return;
  }
  hideMessage();
}

const showMessage = (type, closeButtonClass) => {
  const messageElementTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  messageElement = messageElementTemplate.cloneNode(true);
  body.append(messageElement);
  isOpen = false;
  messageElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown, { capture: true });
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
  if (!body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }
  isOpen = true;
};

export {showMessage};
