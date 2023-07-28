import {openPhoto} from './big-picture.js';
import { renderPictures } from './miniatures.js';
const galleryPictures = document.querySelector('.pictures');

let pictures = [];

const onGalleryPicturesClick = (evt)=> {
  const currentObj = evt.target.closest('[data-picture-id]');
  if (!currentObj){
    return;
  }
  evt.preventDefault();
  const picture = pictures.find((element) => element.id === +currentObj.dataset.pictureId);
  openPhoto(picture);
};

const renderGalleryPictures = (currentPictures) => {
  pictures = currentPictures;
  renderPictures(pictures);
  galleryPictures.addEventListener('click', onGalleryPicturesClick);
};

export {renderGalleryPictures};
