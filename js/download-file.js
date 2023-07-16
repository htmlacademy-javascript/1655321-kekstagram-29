import {isEscapeKey} from '/js/util.js';

const MAX_HASTAG_COUNT = 5;
const ERROR_TEXT = {
  maxCount: 'Максимум 5 хэштегов',
  validHashtag: 'Недопустимые символы в хэштеге',
  notUnique: 'Хэштеги не должны повторяться'
};
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const normalizeHashtag = (hashtags) =>
  hashtags.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const checkHashtagCount = (value) => normalizeHashtag(value).length <= MAX_HASTAG_COUNT;

const checkValidHashtag = (value) => normalizeHashtag(value).every((hashtag) => VALID_HASHTAG.test(hashtag));

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

const closeModal = () =>{
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeKeydownEvent();
  imgUploadCancel.removeEventListener('click', onCancelButtonClick);
};

//функция запуска обработчика закрытия при нажатии на Esc
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
  showModal();
});

textDescription.addEventListener('keydown',stopPropagationEscape);

textHashtags.addEventListener('keydown',stopPropagationEscape);

