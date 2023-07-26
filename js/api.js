const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok){
      throw new Error();
    }

    return response.json();
  } catch {
    throw new Error(ErrorText.GET_DATA);
  }
};

const sendData = async (method, body, onSuccess, onError) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {method, body});
    if (response.ok){
      onSuccess();
      return;
    }
    throw new Error();
  } catch {
    onError();
  }
};


export {getData, sendData};
