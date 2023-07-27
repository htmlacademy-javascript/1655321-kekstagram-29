import {openPhoto} from './big-picture.js';
import { renderPictures } from './miniatures.js';
const galleryPictures = document.querySelector('.pictures');

const renderGalleryPictures = (pictures) => {
  renderPictures(pictures);
  galleryPictures.addEventListener('click', (evt)=> {
    const currentObj = evt.target.closest('[data-picture-id]');
    if (!currentObj){
      return;
    }
    evt.preventDefault();
    const picture = pictures.find((element) => element.id === +currentObj.dataset.pictureId);
    openPhoto(picture);
  });
};

export {renderGalleryPictures};
