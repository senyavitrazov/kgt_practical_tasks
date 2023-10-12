import readline from 'readline';

readline.emitKeypressEvents(process.stdin);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


/*process.stdin.on('keypress', (ch, key) => {
  console.log('got "keypress"', ch, key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});*/

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
const TEXT = 'Srobdoskdehwlf vxevwlwxwlrq flskhuv';
const secondCipher = 'KjgyVgkcVWZqdX nsWnqdqsqdji XdkcZmn';
let complianceTable = {};
let shift = 0; 
let output = '';

function second() { 
  rl.question('Enter text: ', (userInput) => {
    const encryptedText = encryptText(userInput);
    console.log('Ciphred text: ', encryptedText);
    rl.close();
  });

  function encryptText(input) {
    const encryptedChars = input.split('').map((char) => {
      if (complianceTable[char]) {
        return complianceTable[char];
      } else {
        return '*';
      }
    });
    return encryptedChars.join('');
  }
}

process.stdin.on('keypress', (ch, key) => {
  if (key.name == 'left') {
    console.log(toShift(-1));
  } else if (key.name == 'right') {
    console.log(toShift(1));
  } else if (key.name === 'up') {
    output = toShift(0);
    shift = 0;
    console.log('~~~ Alphabet saved ~~~');
    complianceTable = createCipherObject(secondCipher.toLowerCase(), output);
    //console.dir(complianceTable);
    second();
  } else if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  };
});


function toShift(direction) {
  shift += direction;
  const input = TEXT.toLowerCase();
  return input.split('').map((e) => {
    if (alphabet.includes(e)) {
      return alphabet[(alphabet.indexOf(e) + shift + alphabet.length) % alphabet.length];
    } else {
      return e;
    }
  }).join('');
};

function createCipherObject(secondCipher, output) {
  const cipherObject = {};

  secondCipher.split('').forEach((e, i) => {
    cipherObject[output[i]] = e;
  })
  
  // for (let i = 0; i < secondChiper.length; i++) {
  //   const key = secondChiper[i];
  //   const value = output[i];

  //   cipherObject[key] = value;
  // }

  return cipherObject;
}

process.stdin.setRawMode(true);
