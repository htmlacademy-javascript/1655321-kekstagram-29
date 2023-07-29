const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const COMMENTS_PORTION = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;
const ALERT_SHOW_TIME = 5000;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASTAG_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
  TYPE_FILE_ERROR: 'Недопустимое расширение для выбранного файла',
  MAX_COUNT: 'Максимум 5 хэштегов',
  VALID_HASHTAG: 'Недопустимые символы в хэштеге',
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  MAX_TEXT_LENGTH: 'Длина описания не может быть больше 140 символов'
};

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

const SortType = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

export{
  BASE_URL,
  Route,
  ErrorText,
  COMMENTS_PORTION,
  FILE_TYPES,
  SubmitButtonText,
  MAX_SCALE,
  MIN_SCALE,
  PICTURES_COUNT,
  RERENDER_DELAY,
  SortType,
  ALERT_SHOW_TIME,
  VALID_HASHTAG,
  MAX_HASTAG_COUNT,
  COMMENT_MAX_LENGTH
};

