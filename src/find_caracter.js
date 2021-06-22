const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');
let arrayFindCharacter = [];
let fileReader = '../file/find_character.csv';
let countLine = 0;



async function processLineByLine(fileReader,closeFindCharacter,countLine) {
  const fileStream = fs.createReadStream(fileReader,'UTF-8');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    countLine+= 1;
    if(isEspecialCharacter(line) == false){
        arrayFindCharacter.push('\n'+line,countLine);
    }
  }
  
  closeFindCharacter()

  rl.close()
  rl.removeAllListeners()
}



function isEspecialCharacter(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str[i];
      if (code == '�'){ 
        return false;
      }
    }
    return true;
};

function closeFindCharacter(){
    if(arrayFindCharacter != ''){
        impressao.gravaNoArquivo('../file_logs/log-find-character.csv',arrayFindCharacter);
    }
}

//Main
processLineByLine(fileReader,closeFindCharacter,countLine);