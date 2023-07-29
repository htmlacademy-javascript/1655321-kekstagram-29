import {BASE_URL, ErrorText, Route} from './constants.js';

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
