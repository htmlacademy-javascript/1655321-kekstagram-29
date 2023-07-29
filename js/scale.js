import {MAX_SCALE, MIN_SCALE} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
let photoSize = 100;

const changeImageScale = () => {
  uploadPreview.style.transform = `scale(${photoSize / 100})`;
  scaleControlValue.value = `${photoSize.toString()}%`;
};

const onBiggerControlClick = () =>{
  photoSize += MIN_SCALE;
  if (photoSize >= MAX_SCALE){
    photoSize = MAX_SCALE;
  }
  changeImageScale();
};

const onSmallerControlClick = () =>{
  photoSize -= MIN_SCALE;
  if (photoSize <= MIN_SCALE){
    photoSize = MIN_SCALE;
  }
  changeImageScale();
};

const addScaleEvent = () => {
  uploadPreview.style.transform = `scale(${photoSize / 100})`;
  scaleControlSmaller.addEventListener('click', onSmallerControlClick);
  scaleControlBigger.addEventListener('click', onBiggerControlClick);
};

const removeScaleEvent = () => {
  scaleControlSmaller.removeEventListener('click', onSmallerControlClick);
  scaleControlBigger.removeEventListener('click', onBiggerControlClick);
  photoSize = 100;
};

export {removeScaleEvent, addScaleEvent};
