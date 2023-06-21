//Функция для проверки длины строки
function checkStringLegth(someString, maxLength){
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
  let modifiedString = originalString;
  //Убираем пробелы
  modifiedString = modifiedString.replaceAll(' ', '');
  //Убираем регистр
  modifiedString = modifiedString.toLowerCase();
  //Делаем реверс строки
  const compareString = reverseString(modifiedString);
  //Сравниваем значения
  return modifiedString === compareString;
}

//Функция для извлечения числа из строки
function getNumber(someString){
  //console.log(someString);
  let result = '';
  let modifiedString = (Number.isFinite(someString)) ? someString.toString() : someString;
  //console.log(modifiedString);
  //Убираем пробелы
  modifiedString = modifiedString.replaceAll(' ', '');
  //console.log(modifiedString);
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
checkStringLegth('проверяемая строка', 20); // true
// Cтрока короче 20 символов
/*console.log(checkStringLegth('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkStringLegth('проверяемая строка', 18)); // true
// Строка короче 10 символов
console.log(checkStringLegth('проверяемая строка', 10)); // false
*/

//Тестирование функции checkPalindrome()
checkPalindrome('топот'); // true
/*// Строка является палиндромом
console.log(checkPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(checkPalindrome('ДовОд')); // true
// Это не палиндром
console.log(checkPalindrome('Кекс')); // false
// Это палиндром
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
*/

//Тестирование функции getNumber()
getNumber('2023 год');
// console.log(getNumber('2023 год'));// 2023
// console.log(getNumber('ECMAScript 2022'));// 2022
// console.log(getNumber('1 кефир, 0.5 батона')); // 105
// console.log(getNumber('агент 007'));// 7
// console.log(getNumber('а я томат'));// NaN
// console.log(getNumber(2023)); // 2023
// console.log(getNumber(-1)); // 1
// console.log(getNumber(1.5)); // 15
