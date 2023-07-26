import { renderGalleryPictures } from './gallery.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit} from './download-file.js';

try{
  const pictures = await getData();
  renderGalleryPictures(pictures);
} catch (err){
  showAlert(err.message);
}

setOnFormSubmit();


