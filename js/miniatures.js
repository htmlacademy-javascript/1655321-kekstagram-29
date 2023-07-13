const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createPicture = ({url, description, likes, comments, id}) => {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.dataset.pictureId = id;
  return picture;
};

const renderPictures = (photoDescriptions) => {
  const photoDescriptionsFragment = document.createDocumentFragment();
  photoDescriptions.forEach((photoDescription) => {
    const picture = createPicture(photoDescription);
    photoDescriptionsFragment.appendChild(picture);
  });

  pictures.appendChild(photoDescriptionsFragment);
};

export {renderPictures};

