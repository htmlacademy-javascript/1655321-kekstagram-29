import { createPhotoDescriptions } from '/js/data.js';
import { renderPictures } from '/js/miniatures.js';
import { renderGalleryPictures } from '/js/gallery.js';
import '/js/download-file.js';

const pictures = createPhotoDescriptions();
renderPictures(pictures);
renderGalleryPictures(pictures);
