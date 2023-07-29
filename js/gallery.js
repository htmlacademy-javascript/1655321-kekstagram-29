import {openPhoto} from './big-picture.js';
import {renderPictures} from './miniatures.js';
import {addSort, renderSortingPictures} from './sort-pictures.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

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

const getPictures = async() => {
  try{
    const receivedPictures = await getData();
    renderGalleryPictures(receivedPictures);
    addSort(receivedPictures);
    renderSortingPictures(document.querySelector('.img-filters__button--active').id, receivedPictures);
  } catch (err){
    showAlert(err.message);
  }
};

export {renderGalleryPictures, getPictures};
