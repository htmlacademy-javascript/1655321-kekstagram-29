import {isEscapeKey} from '/js/util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count'); //необходимо скрыть по заданию
const commentsLoader = bigPicture.querySelector('.comments-loader');//необходимо скрыть по заданию
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

//Собрать описание к фото
const renderBigPicturesContent = ({url, description, likes, comments }) => {
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
const renderComments = ({comments}) => {
  socialComments.innerHtml = '';
  const commentFragment = document.createDocumentFragment();
  comments.forEach((element)=> {
    const comment = createComment(element);
    commentFragment.appendChild(comment);
  });
  socialComments.appendChild(commentFragment);
};

//Закрыть окно с фото
const closePhoto = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyElement.classList.add('modal-open');

  renderBigPicturesContent(picture);
  renderComments(picture);
};

export {openPhoto};

