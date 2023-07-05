//Функция для проверки длины строки
function checkStringLength(someString, maxLength){
  return someString.length <= maxLength;
}

function reverseString(someString){
  //return Array.from(someString).reverse().join('');
  let result = '';
  for (let i = someString.length - 1; i >= 0; i--){
    result += someString[i];
  }
  return result;
}


//Функция для проверки, является ли строка палиндромом
function checkPalindrome(originalString){
  const modifiedString = originalString.replaceAll(' ', '').toLowerCase();
  //Делаем реверс строки
  const compareString = reverseString(modifiedString);
  //Сравниваем значения
  return modifiedString === compareString;
}

//Функция для извлечения числа из строки
function getNumber(someString){
  let result = '';
  let modifiedString = (Number.isFinite(someString)) ? someString.toString() : someString;
  //Убираем пробелы
  modifiedString = modifiedString.replaceAll(' ', '');
  //Убираем все символы кроме цифр
  //modifiedString = modifiedString.replace(/[0-9]/g, '');

  for (const item of modifiedString){
    const receivedNumber = parseInt(item, 10);
    if (!Number.isNaN(receivedNumber)){
      result += item;
    }
  }
  if (result && result.length){
    return Number(result);
  }
  return NaN;
}


//Тестирование функции checkStringLegth()
checkStringLength('проверяемая строка', 20); // true
// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка короче 10 символов
checkStringLength('проверяемая строка', 10); // false


//Тестирование функции checkPalindrome()
checkPalindrome('топот'); // true
// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true


//Тестирование функции getNumber()
getNumber('2023 год');
getNumber('2023 год');// 2023
getNumber('ECMAScript 2022');// 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007');// 7
getNumber('а я томат');// NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15

const getTime = (time) => {
  const [hour, minutes] = time.split(':').map(Number);
  return hour * 60 + minutes;
};


const checkWorkTime = (startTime, endTime, startMeet, durationMeet) => {
  const startMinutes = getTime(startTime);
  const endMinutes = getTime(endTime);
  const startMeetMinutes = getTime(startMeet);
  return startMeetMinutes >= startMinutes && (startMeetMinutes + durationMeet) <= endMinutes;
};

checkWorkTime('08:00', '17:30', '14:00', 90); // true
checkWorkTime('8:0', '10:0', '8:0', 120); // true
checkWorkTime('08:00', '14:30', '14:00', 90); // false
checkWorkTime('14:00', '17:30', '08:0', 90); // false
checkWorkTime('8:00', '17:30', '08:00', 900); // false
