import { debounce } from './util.js';
import { renderGalleryPictures } from './gallery.js';
import { PICTURES_COUNT, RERENDER_DELAY, SortType } from './constants.js';

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

const sortByCommentsCount = (pictures) => (pictures.slice().sort((a, b) => b.comments.length - a.comments.length));

const sortByRandomOrder = (pictures) => {
  const picturesClone = pictures.slice();
  for (let i = picturesClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [picturesClone[i], picturesClone[j]] = [picturesClone[j], picturesClone[i]];
  }

  return picturesClone.splice(0, PICTURES_COUNT);
};

const getSortingPictures = (id, pictures) => {
  switch (id) {
    case SortType.RANDOM:
      return sortByRandomOrder(pictures);
    case SortType.DISCUSSED:
      return sortByCommentsCount(pictures);
    default:
      return pictures;
  }
};

const renderSortingPictures = (id, pictures) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderGalleryPictures(getSortingPictures(id, pictures));
};

const renderPictures = debounce((id, pictures) => renderSortingPictures(id, pictures), RERENDER_DELAY);

const initSort = (pictures) => {
  filters.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      renderPictures(evt.target.id, pictures);
    }
  });
};

export {initSort, renderSortingPictures};
