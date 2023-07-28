import { renderGalleryPictures } from './gallery.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit} from './download-file.js';
import { initFilter, renderSortingPictures } from './sort-pictures.js';

try{
  const pictures = await getData();
  renderGalleryPictures(pictures);
  initFilter(pictures);
  renderSortingPictures(document.querySelector('.img-filters__button--active').id, pictures);
} catch (err){
  showAlert(err.message);
}

setOnFormSubmit();


