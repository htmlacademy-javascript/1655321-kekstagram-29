const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
let photoSize = 100;

const imageScale = () => {
  imgUploadPreview.style.transform = `scale(${photoSize / 100})`;
  scaleControlValue.value = `${photoSize.toString()}%`;
};

const onBiggerControlClick = () =>{
  photoSize += 25;
  if (photoSize >= 100){
    photoSize = 100;
  }
  imageScale();
};

const onSmallerControlClick = () =>{
  photoSize -= 25;
  if (photoSize <= 25){
    photoSize = 25;
  }
  imageScale();
};

const addScaleEvent = () => {
  imgUploadPreview.style.transform = `scale(${photoSize / 100})`;
  scaleControlSmaller.addEventListener('click', onSmallerControlClick);
  scaleControlBigger.addEventListener('click', onBiggerControlClick);
};

const removeScaleEvent = () => {
  scaleControlSmaller.removeEventListener('click', onSmallerControlClick);
  scaleControlBigger.removeEventListener('click', onBiggerControlClick);
  photoSize = 100;
};

export {removeScaleEvent, addScaleEvent};
