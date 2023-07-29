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
  document.removeEventListener('click', onClickOutside);
};

//Функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    hideMessage();
  }
}

function onClickOutside(evt) {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    hideMessage();
  }
}

const showMessage = (type, closeButtonClass) => {
  const messageElementTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  messageElement = messageElementTemplate.cloneNode(true);
  body.append(messageElement);
  isOpen = false;
  document.addEventListener('keydown', onDocumentKeydown, { capture: true });
  document.addEventListener('click', onClickOutside);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
  if (!body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }
  isOpen = true;
};

export {showMessage};
