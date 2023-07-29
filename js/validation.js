import {ErrorText, VALID_HASHTAG, MAX_HASTAG_COUNT, COMMENT_MAX_LENGTH} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkTextDescriptionLength = (value) => value.length <= COMMENT_MAX_LENGTH;

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

const pristineValidate = () => pristine.validate();
const pristineReset = () => pristine.reset();

const addValidator = () => {
  pristine.addValidator(textDescription, checkTextDescriptionLength, ErrorText.MAX_TEXT_LENGTH, 1, true);
  pristine.addValidator(textHashtags, checkHashtagCount, ErrorText.MAX_COUNT, 3, true);
  pristine.addValidator(textHashtags, checkValidHashtag, ErrorText.VALID_HASHTAG, 2, true);
  pristine.addValidator(textHashtags, checkUniqueHashtag, ErrorText.NOT_UNIQUE, 1, true);
};

export {addValidator, pristineValidate, pristineReset};
