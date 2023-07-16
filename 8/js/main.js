import { createPhotoDescriptions } from '/js/data.js';
import { renderPictures } from '/js/miniatures.js';
import { renderGalleryPictures } from '/js/gallery.js';

const pictures = createPhotoDescriptions();
renderPictures(pictures);
console.log(pictures);
renderGalleryPictures(pictures);
