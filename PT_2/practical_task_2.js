function findCharIndex(char) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (key[i][j] === char) {
        return [i, j];
      }
    }
  }
}


function playfairEncrypt(plainText, key) {

  plainText = plainText.replace(/\s/g, '').toUpperCase();
  
  // on pairs and adding 'X'
  let pairs = [];
  for (let i = 0; i < plainText.length; i += 2) {
    let firstChar = plainText[i];
    let secondChar = (i + 1 < plainText.length) ? plainText[i + 1] : 'X';
    if (firstChar === secondChar) {
      secondChar = 'X';
      i--;
    }
    pairs.push([firstChar, secondChar]);
  }

  // chipering of pairs
  let cipherText = '';
  for (const [char1, char2] of pairs) {
    const [x1, y1] = findCharIndex(char1);
    const [x2, y2] = findCharIndex(char2);
    
    if (x1 === x2) {
      cipherText += key[x1][(y1 + 1) % 5] + key[x2][(y2 + 1) % 5];
    } else if (y1 === y2) {
      cipherText += key[(x1 + 1) % 5][y1] + key[(x2 + 1) % 5][y2];
    } else {
      cipherText += key[x1][y2] + key[x2][y1];
    }
  }

  return cipherText;
}

function playfairDecrypt(cipherText, key) {
  // literally the same

  let pairs = [];
  for (let i = 0; i < cipherText.length; i += 2) {
    pairs.push([cipherText[i], cipherText[i + 1]]);
  }

  let plainText = '';
  for (const [char1, char2] of pairs) {
    const [x1, y1] = findCharIndex(char1);
    const [x2, y2] = findCharIndex(char2);

    if (x1 === x2) {
      plainText += key[x1][(y1 + 4) % 5] + key[x2][(y2 + 4) % 5];
    } else if (y1 === y2) {
      plainText += key[(x1 + 4) % 5][y1] + key[(x2 + 4) % 5][y2];
    } else {
      plainText += key[x1][y2] + key[x2][y1];
    }
  }

  return plainText;
}

const key = [['W', 'H', 'E', 'A', 'T'], ['S', 'O', 'N', 'B', 'C'], ['D', 'F', 'G', 'I', 'K'], ['L', 'M', 'P', 'Q', 'R'], ['U', 'V', 'X', 'Y', 'Z']];
const plaintext = "Arseni Glik";
const encryptedText = playfairEncrypt(plaintext, key);
console.log("Зашифрованный текст:", encryptedText);
const decryptedText = playfairDecrypt(encryptedText, key);
console.log("Расшифрованный текст:", decryptedText);
