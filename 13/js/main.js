import { renderGalleryPictures } from './gallery.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit} from './download-file.js';
import { initSort, renderSortingPictures } from './sort-pictures.js';

setOnFormSubmit();

try{
  const pictures = await getData();
  renderGalleryPictures(pictures);
  initSort(pictures);
  renderSortingPictures(document.querySelector('.img-filters__button--active').id, pictures);
} catch (err){
  showAlert(err.message);
}
