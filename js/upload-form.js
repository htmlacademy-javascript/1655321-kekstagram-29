import {isEscapeKey, showAlert} from './util.js';
import {removeScaleEvent, addScaleEvent} from './scale.js';
import {addEffectEvent, removeEffectEvent} from './effect.js';
import {showMessage} from './message.js';
import {sendData} from './api.js';
import {addValidator, pristineValidate, pristineReset} from './validation.js';
import {ErrorText, FILE_TYPES, SubmitButtonText} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

//Блокировка нажатия Esc при фокусе
const stopPropagationEscapeHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

//Функция для закрытия окна с редактированием файла
const closeModal = () =>{
  uploadForm.reset();
  pristineReset();
  uploadModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeScaleEvent();
  removeEffectEvent();
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onCancelButtonClick);
  uploadModal.removeEventListener('click', onOutsideClick);
  textDescription.removeEventListener('keydown',stopPropagationEscapeHandler);
  textHashtags.removeEventListener('keydown',stopPropagationEscapeHandler);
};

//Функция для открытия окна с редактированием файла
const showModal = () => {
  uploadModal.classList.remove('hidden');
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
function onOutsideClick (evt) {
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

const onUploadInputChange = () => {
  addScaleEvent();
  addEffectEvent();
  addValidator();
  showModal();
  const file = uploadInput.files[0];
  if (file && isValidFileType(file)) {
    uploadPreview.src = URL.createObjectURL(file);
  }else{
    showAlert(ErrorText.TYPE_FILE_ERROR);
  }
  effectsPreviews.forEach((effect) => (effect.style.backgroundImage = `url(${uploadPreview.src})`));
  uploadCancel.addEventListener('click', onCancelButtonClick);
  uploadModal.addEventListener('click', onOutsideClick);
  textDescription.addEventListener('keydown',stopPropagationEscapeHandler);
  textHashtags.addEventListener('keydown',stopPropagationEscapeHandler);
};

//Блокировка/ разблокировка кнопки отправки формы
const toggleSubmitButton = (isDisabled) => {
  uploadSubmit.disabled = isDisabled;
  uploadSubmit.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
  uploadSubmit.style.opacity = isDisabled ? 0.5 : 1;
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
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristineValidate()) {
      toggleSubmitButton(true);
      await sendData('POST', new FormData(evt.target), uploadSuccess, uploadError);
    }
  });
};

export {setOnFormSubmit, closeModal};
