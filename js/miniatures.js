import { createPhotoDescriptions } from '/js/data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
pictures.classList.remove('visually-hidden');

const photoDescriptions = createPhotoDescriptions();

const photoDescriptionsFragment = document.createDocumentFragment();

photoDescriptions.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  photoDescriptionsFragment.appendChild(picture);
});

pictures.appendChild(photoDescriptionsFragment);

