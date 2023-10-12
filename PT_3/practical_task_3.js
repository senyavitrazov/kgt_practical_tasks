function encrypt(text, a, s, N) {
  let encryptedText = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      encryptedText += ' '; // Пробелы остаются без изменений
    } else {
      const Pi = getRussianAlphabetIndex(text[i]); // Порядковый номер символа открытого текста
      const Ci = (a * Pi + s) % N; // Формула шифрования
      const encryptedChar = getRussianAlphabetChar(Ci); // Преобразование обратно в символ
      encryptedText += encryptedChar;
    }
  }

  return encryptedText;
}

function decrypt(encryptedText, a, s, N) {
  let decryptedText = '';

  for (let i = 0; i < encryptedText.length; i++) {
    if (encryptedText[i] === ' ') {
      decryptedText += ' '; // Пробелы остаются без изменений
    } else {
      const Ci = getRussianAlphabetIndex(encryptedText[i]); // Порядковый номер символа зашифрованного текста
      // Используем a^(-1) для вычисления обратной операции
      const aInverse = findModularInverse(a, N);
      const Pi = (aInverse * (Ci - s + N)) % N; // Формула расшифрования
      const decryptedChar = getRussianAlphabetChar(Pi); // Преобразование обратно в символ
      decryptedText += decryptedChar;
    }
  }

  return decryptedText;
}


// Функция для нахождения обратного элемента a по модулю N
function findModularInverse(a, N) {
  for (let x = 1; x < N; x++) {
    if ((a * x) % N === 1) {
      return x;
    }
  }
  return null; // Обратный элемент не существует
}

// Функция для получения порядкового номера буквы в русском алфавите
function getRussianAlphabetIndex(char) {
  const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ";
  return alphabet.indexOf(char);
}

// Функция для получения буквы из русского алфавита по порядковому номеру
function getRussianAlphabetChar(index) {
  const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ";
  return alphabet[index];
}

const a = 7; // a
const s = 3; // сдвиг
const N = 33; // alph + space

const plaintext = "великий и могучий русский язык".toUpperCase();

const encryptedText = encrypt(plaintext, a, s, N); // Зашифрованный текст
console.log("Зашифрованный текст:", encryptedText);

const decryptedText = decrypt(encryptedText, a, s, N); // Расшифрованный текст
console.log("Расшифрованный текст:", decryptedText);
