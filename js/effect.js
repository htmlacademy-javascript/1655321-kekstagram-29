const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectOptions = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

let chosenEffect = Effect.DEFAULT;

const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffects = imgUpload.querySelector('.effects');
const imgUploadEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValue = imgUpload.querySelector('.effect-level__value');


const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT){
    imgUploadPreview.style.filter = null;
    return;
  }
  const levelValue = effectLevelValue.value;
  const { style, unit } = effectOptions[chosenEffect];
  imgUploadPreview.style.filter = `${style}(${levelValue}${unit})`;
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min,
      max,
    },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value) > 1) {
          return value.toFixed(0);
        }
        return value.toFixed(2);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    setImageStyle();
  });
};

const destroySlider = () => {
  if (effectLevelSlider.noUiSlider){
    effectLevelSlider.noUiSlider.destroy();
  }
  setImageStyle();
};

const setSlider = () => {
  destroySlider();
  imgUploadEffectLevel.classList.add('hidden');
  if (chosenEffect !== Effect.DEFAULT){
    createSlider(effectOptions[chosenEffect]);
    imgUploadEffectLevel.classList.remove('hidden');
  }
};

const onEffectChange = (evt) => {
  chosenEffect = evt.target.value;
  setSlider();
};

const removeEffectEvent = () => {
  chosenEffect = Effect.DEFAULT;
  imgUploadEffects.removeEventListener('change', onEffectChange);
  setSlider();
};

const addEffectEvent = () => {
  setSlider();
  imgUploadEffects.addEventListener('change', onEffectChange);
};

export { addEffectEvent, removeEffectEvent };


