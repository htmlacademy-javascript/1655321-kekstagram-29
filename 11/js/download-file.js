import {isEscapeKey} from './util.js';
import {removeScaleEvent, addScaleEvent} from './scale.js';
import { addEffectEvent, removeEffectEvent } from './effect.js';
import { showMessage } from './message.js';
import { sendData } from './api.js';

const MAX_HASTAG_COUNT = 5;
const ERROR_TEXT = {
  maxCount: 'Максимум 5 хэштегов',
  validHashtag: 'Недопустимые символы в хэштеге',
  notUnique: 'Хэштеги не должны повторяться'
};
const MESSAGE_TYPE = {
  success: 'success',
  error: 'error'
};
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');


const pristine = new Pristine(imgUploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

//Приводит хэштег к удобному для проверки виду
const normalizeHashtag = (hashtags) =>
  hashtags.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

//Проверка на количество хэштегов
const checkHashtagCount = (value) => normalizeHashtag(value).length <= MAX_HASTAG_COUNT;

//Проверка на допустимые символы в хэштеге
const checkValidHashtag = (value) => normalizeHashtag(value).every((hashtag) => VALID_HASHTAG.test(hashtag));

//Проверка хэштега на дубли
const checkUniqueHashtag = (value) => {
  const lowerCaseHashtags = normalizeHashtag(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(
  textHashtags,
  checkHashtagCount,
  ERROR_TEXT.maxCount,
  3,
  true);

pristine.addValidator(
  textHashtags,
  checkValidHashtag,
  ERROR_TEXT.validHashtag,
  2,
  true);

pristine.addValidator(
  textHashtags,
  checkUniqueHashtag,
  ERROR_TEXT.notUnique,
  1,
  true);

const removeKeydownEvent = ()=>{
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addKeydownEvent = ()=>{
  document.addEventListener('keydown', onDocumentKeydown);
};

const stopPropagationEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

//Функция для закрытия окна с редактированием файла
const closeModal = () =>{
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeKeydownEvent();
  imgUploadCancel.removeEventListener('click', onCancelButtonClick);
  removeScaleEvent();
  removeEffectEvent();
};

//Функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  addKeydownEvent();
};

function onCancelButtonClick(){
  closeModal();
}

imgUploadInput.addEventListener('change', () => {
  imgUploadCancel.addEventListener('click', onCancelButtonClick);
  addScaleEvent();
  addEffectEvent();
  showModal();
});

//Блокировка нажатия Esc при фокусе в поле с описанием
textDescription.addEventListener('keydown',stopPropagationEscape);

//Блокировка нажатия Esc при фокусе в поле с хэштегами
textHashtags.addEventListener('keydown',stopPropagationEscape);

const toggleSubmitButton = (isDisabled) => {
  imgUploadSubmit.disabled = isDisabled;
  imgUploadSubmit.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const uploadSuccess = () => {
  closeModal();
  showMessage(MESSAGE_TYPE.success, '.success__button');
  toggleSubmitButton(false);
};

const uploadError = () => {
  showMessage(MESSAGE_TYPE.error, '.error__button');
  toggleSubmitButton(false);
};

const setOnFormSubmit = () => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      await sendData('POST', new FormData(evt.target), uploadSuccess, uploadError);
    }
  });
};

export {setOnFormSubmit, closeModal};
