const USER_PHOTO_COUNT = 25;

const COMMENTS_COUNT = 30;

const PHOTO_DESCRIPTION = [
  'Рецепт блинчиков',
  'Ремонтируем квартиру',
  'Путешествуем по стране',
  'Утренняя прогулка в лесу'
];

const NAMES = [
  'Татьяна',
  'Петр',
  'Алексей',
  'Дарья',
  'Александр',
  'Роман',
  'Елена',
  'Виктория',
  'Мария',
  'Иван',
  'Кирилл',
  'Лев'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomNumberFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= max - min + 1) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatePhotoId = createRandomNumberFromRangeGenerator(1, 25);
const generateUrlId = createRandomNumberFromRangeGenerator(1, 25);
const generateCommentId = createRandomNumberFromRangeGenerator(1, 500);
const generateAvatarId = createRandomNumberFromRangeGenerator(1, 6);

const createComment = () => {
  const id = generateCommentId();
  const avatarId = generateAvatarId();
  const messageCount = getRandomInteger(1, 2);
  let message = [];
  for (let i = 0; i <= messageCount; i++){
    message.push(getRandomArrayElement(MESSAGES));
  }
  message = message.join(' ');
  return {
    id: id,
    avatar: `img/avatar-${avatarId}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
};

const createPhotoDescription = () => {
  const id = generatePhotoId();
  const urlId = generateUrlId();
  return{
    id: id,
    url: `photos/${urlId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: COMMENTS_COUNT}, createComment)
  };
};

Array.from({length: USER_PHOTO_COUNT}, createPhotoDescription);


