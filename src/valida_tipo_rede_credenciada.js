const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(positionArray,functionFieldOpen,functionFieldClose,countLine) {
  const fileStream = fs.createReadStream('../file/tipo_rede_credenciada.csv','UTF-8');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    countLine += 1;
    if(countLine > 1){
      let splitLinha = line.split(';');
      let replaceLinha = splitLinha[positionArray].toString().replace(/"/gi,'');
      let fileField = replaceLinha;
      functionFieldOpen(fileField,countLine);
    }
  }
  functionFieldClose();

  rl.close()
  rl.removeAllListeners()
}



//REGRA: CLASSE--------------------------------------------------------------------------------------------------------
let arrayClasse = [];
let countLineClasse = 0;

function isAlphaNumeric(str) {
  var code, i, len;

for (i = 0, len = str.length; i < len; i++) {
  code = str.charCodeAt(i);
  if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code == 45 ) && // code (-)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
    return false;
  }
}
return true;
};

function openClasse(value,numberLine){
  if(isAlphaNumeric(value) == false){
    arrayClasse.push('\n'+'classe - nao eh alfanumerico ou em branco',value,numberLine);
  }
}

function closeClasse(){
  if(arrayClasse != ''){
    impressao.gravaNoArquivo('../file_logs/log-tipo-rede-cred.csv',arrayClasse);
  }
}

//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(0,openClasse,closeClasse,countLineClasse);




//REGRA: DESCRICAO------------------------------------------------------------------------------------------------------------------------
let arrayDescricao = [];
let countLineDescricao = 0;

function openDescricao(value,numberLine){
  if(!value.trim()){
      arrayDescricao.push('\n'+'descricao - em branco ou vazia',null,numberLine);
  }
}

function closeDescricao(){
  if(arrayDescricao != ''){
    impressao.gravaNoArquivo('../file_logs/log-tipo-rede-cred.csv',arrayDescricao);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(1,openDescricao,closeDescricao,countLineDescricao);




//REGRAS: VERSAO_LAYOUT------------------------------------------------------------------------------
let countLineVersaoLayout = 0;
let arrayVersaoLayout = [];

function openVersaoLayout(value,numberLine){
    if(value != '2.2'){
      arrayVersaoLayout.push('\n'+'versao_layout - versao invalida',value,numberLine);
    }
  }
    
  function closeVersaoLayout(){
    if(arrayVersaoLayout != ''){
      impressao.gravaNoArquivo('../file_logs/log-tipo-rede-cred.csv',arrayVersaoLayout);
    }
  }

  //EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
  processLineByLine(2,openVersaoLayout,closeVersaoLayout,countLineVersaoLayout);