function decimalToBinary(number,  exp) {  
  return (BigInt(number) ** BigInt(exp)).toString(2);
}

console.log(`1. ${decimalToBinary(3, 43)}`);

const letterToBinary = {};
const alphabet = 'АБВГДЕЖЗИЙКЛМНОП'; // 16 букв русского алфавита
const message = "ЗИЙКЛМНОПАБВГДЕЖ";

for (let i = 0; i < alphabet.length; i++) {
  const letter = alphabet[i];
  const binaryCode = (i).toString(2).padStart(4, '0');
  letterToBinary[letter] = binaryCode;
}


function splitMessageIntoBlocks(message, blockSize) {
  let blocks = null;
  for (let i = 0; i < message.length; i += blockSize) {
    blocks = message.slice(i, i + blockSize);
  }
  return blocks;
}

// Функция для конвертации блока букв в двоичный блок
function convertLettersToBinary(block) {
  let binaryBlock = "";
  for (const letter of block) {
    binaryBlock += letterToBinary[letter];
  }
  return binaryBlock;
}

// block to bin
function binaryToDecimal(binaryBlock) {
  return parseInt(binaryBlock, 2);
}

const blockSize = 64;
const block = splitMessageIntoBlocks(message, blockSize);

// каждый блок в двоичный и затем в десятичный формат
const decimalValues = binaryToDecimal(convertLettersToBinary(block));

console.log(`2. Значения полученных блоков в десятичной системе счисления: ${decimalValues}`);


/*------PART 3-------*/
let X = 179327333;
const bitLength = 28;
const shiftBits = 5;
X = ((X << shiftBits) | (X >> (bitLength - shiftBits))) & ((1 << bitLength) - 1);
console.log(`3. Состояние 28-разрядного регистра после циклического сдвига на 5 разрядов: ${X}`);
/*влево на 5 разрядов для числа X, а затем обрезает результат до 28 разрядов с помощью маски ((1 << bitLength) - 1). */

/*-----PART 4-----*/
const number1 = 224489930110;
const number2 = 179327333;
const sumMod2 = (number1 + number2) % 2;

console.log(`5. Сумма ${number1} и ${number2} по модулю 2: ${sumMod2}`);
