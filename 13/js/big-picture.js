import { isEscapeKey } from './util.js';
import { COMMENTS_PORTION } from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count'); //необходимо скрыть по заданию
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

let commentsVisibleCount = 0;
let comments = [];

//Собрать описание к фото
const renderBigPicturesContent = ({url, description, likes }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
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
    socialCommentsLoader.classList.add('hidden');
    commentsVisibleCount = comments.length;
  } else{
    socialCommentsLoader.classList.remove('hidden');
  }
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsVisibleCount; i++){
    const comment = createComment(comments[i]);
    commentFragment.appendChild(comment);
  }
  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
  socialCommentCount.querySelector('#comments').textContent = commentsVisibleCount;
  socialCommentCount.querySelector('.comments-count').textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();


//Закрыть окно с фото
const closePhoto = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsVisibleCount = 0;
};

//функция запуска обработчика закрытия при нажатии на Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
}

bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePhoto();
});

//Открыть окно с фото в полном размере
const openPhoto = (picture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.add('modal-open');
  renderBigPicturesContent(picture);
  comments = picture.comments;
  if (comments.length > 0){
    renderComments();
  }
  socialCommentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {openPhoto};

