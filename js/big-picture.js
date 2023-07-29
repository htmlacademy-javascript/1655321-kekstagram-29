import {isEscapeKey} from './util.js';
import {COMMENTS_PORTION} from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

let commentsVisibleCount = 0;
let comments = [];

//Собрать описание к фото
const renderBigPicturesContent = ({url, description, likes }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.querySelector('.comments-count').textContent = comments.length;
  bigPictureCaption.textContent = description;
};

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  const commentImg = newComment.querySelector('.social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

//Сформировать комментарии
const renderComments = () => {
  commentsVisibleCount += COMMENTS_PORTION;
  if (commentsVisibleCount >= comments.length){
    commentsLoader.classList.add('hidden');
    commentsVisibleCount = comments.length;
  } else{
    commentsLoader.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsVisibleCount; i++){
    const comment = createComment(comments[i]);
    commentsFragment.appendChild(comment);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentsFragment);
  commentsCount.querySelector('#comments').textContent = commentsVisibleCount;
  commentsCount.querySelector('.comments-count').textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();


//Закрыть окно с фото
const closePhoto = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onBigPictureCancelClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsVisibleCount = 0;
};

//функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
}

//Функция запуска обработчика закрытия окна по кнопке закрытия
function onBigPictureCancelClick (evt) {
  evt.preventDefault();
  closePhoto();
}

//Открыть окно с фото в полном размере
const openPhoto = (picture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onBigPictureCancelClick);
  bodyElement.classList.add('modal-open');
  renderBigPicturesContent(picture);
  comments = picture.comments;
  if (comments.length > 0){
    renderComments();
  }
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {openPhoto};

