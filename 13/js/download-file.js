import {isEscapeKey, showAlert} from './util.js';
import {removeScaleEvent, addScaleEvent} from './scale.js';
import { addEffectEvent, removeEffectEvent } from './effect.js';
import { showMessage } from './message.js';
import { sendData } from './api.js';
import { initValidator, pristineValidate, pristineReset } from './validation.js';
import { ErrorText, FILE_TYPES, SubmitButtonText} from './constants.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

//Функция для закрытия окна с редактированием файла
const closeModal = () =>{
  imgUploadForm.reset();
  pristineReset();
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancel.removeEventListener('click', onCancelButtonClick);
  imgUploadOverlay.removeEventListener('click', onClickOutside);
  removeScaleEvent();
  removeEffectEvent();
};

//Функция для открытия окна с редактированием файла
const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//Функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

//Функция запуска обработчика клика вне формы
function onClickOutside(evt) {
  if (evt.target.classList.contains('img-upload__overlay')) {
    closeModal();
  }
}

//Функция запуска обработчика при нажатии на кнопку закрытия формы
function onCancelButtonClick(){
  closeModal();
}

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const uploadInputChangeHandler = () => {
  addScaleEvent();
  addEffectEvent();
  initValidator();
  showModal();
  const file = imgUploadInput.files[0];
  if (file && isValidFileType(file)) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }else{
    showAlert(ErrorText.TYPE_FILE_ERROR);
  }
  effectsPreviews.forEach((effect) => (effect.style.backgroundImage = `url(${imgUploadPreview.src})`));
  imgUploadCancel.addEventListener('click', onCancelButtonClick);
  imgUploadOverlay.addEventListener('click', onClickOutside);
};

const stopPropagationEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

//Блокировка нажатия Esc при фокусе в поле с описанием
textDescription.addEventListener('keydown',stopPropagationEscape);

//Блокировка нажатия Esc при фокусе в поле с хэштегами
textHashtags.addEventListener('keydown',stopPropagationEscape);

//Блокировка/ разблокировка кнопки отправки формы
const toggleSubmitButton = (isDisabled) => {
  imgUploadSubmit.disabled = isDisabled;
  imgUploadSubmit.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
  imgUploadSubmit.style.opacity = isDisabled ? 0.5 : 1;
};

const uploadSuccess = () => {
  showMessage('success', '.success__button');
  closeModal();
  toggleSubmitButton(false);
};

const uploadError = () => {
  showMessage('error', '.error__button');
  toggleSubmitButton(false);
};

//Функция отправки формы
const setOnFormSubmit = () => {
  imgUploadInput.addEventListener('change', uploadInputChangeHandler);
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristineValidate()) {
      toggleSubmitButton(true);
      await sendData('POST', new FormData(evt.target), uploadSuccess, uploadError);
    }
  });
};

export {setOnFormSubmit, closeModal};
