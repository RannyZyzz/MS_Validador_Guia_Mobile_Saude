const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(positionArray,functionFieldOpen,functionFieldClose,countLine) {
  const fileStream = fs.createReadStream('../file/planos.csv','UTF-8');

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



//REGRA: CODIGO_LEGADO--------------------------------------------------------------------------------------------------------
let arrayCodigoLegado = [];
let countLineCodigoLegado = 0;

function openCodigoLegado(value,numberLine){
  if(value.indexOf(' ') !== -1){
    arrayCodigoLegado.push('\n'+'codigo legado - espaços em branco entre palavras',value,numberLine);
  }
}

function closeCodigoLegado(){
  if(arrayCodigoLegado != ''){
    impressao.gravaNoArquivo('../file_logs/log-plano.csv',arrayCodigoLegado);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(0,openCodigoLegado,closeCodigoLegado,countLineCodigoLegado);







//REGRA: DESCRICAO------------------------------------------------------------------------------------------------------------------------
let countLineDescricao = 0;
let arrayDescricao = [];

function openDescricao(value,numberLine){
  if(!value.trim()){
      arrayDescricao.push('\n'+'descricao - em branco ou vazia',null,numberLine);
  }
}

function closeDescricao(){
  if(arrayDescricao != ''){
    impressao.gravaNoArquivo('../file_logs/log-plano.csv',arrayDescricao);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(1,openDescricao,closeDescricao,countLineDescricao);



//REGRAS: VERSAO_LAYOUT---------------------------------------------------------------------------------------------------------------
let countLineVersaoLayout = 0;
let arrayVersaoLayout = [];

function openVersaoLayout(value,numberLine){
  if(value != '2.2'){
    arrayVersaoLayout.push('\n'+'versao_layout - versao invalida',value,numberLine);
  }
}
  
function closeVersaoLayout(){
  if(arrayVersaoLayout != ''){
    impressao.gravaNoArquivo('../file_logs/log-plano.csv',arrayVersaoLayout);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(4,openVersaoLayout,closeVersaoLayout,countLineVersaoLayout);


//REGRAS: REGISTRO_PLANO_ANS--------------------------------------------------------------------------------------------------
let countLineRegistroPlanoAns = 0;
let arrayRegistroPlanoAns = [];

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 44 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

function openRegistroPlanoANS(value,numberLine){
  if(isAlphaNumeric(value) == false){
    arrayRegistroPlanoAns.push('\n'+'registro_plano_ans - nao eh alfanumerico ou em branco',value,numberLine);
  }
}

function closeRegistroPlanoANS(){  
  if(arrayRegistroPlanoAns != ''){
      impressao.gravaNoArquivo('../file_logs/log-plano.csv',arrayRegistroPlanoAns);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(5,openRegistroPlanoANS,closeRegistroPlanoANS,countLineRegistroPlanoAns);


//REGRAS: CLASSIFICACAO_PARA_FINS_COMERCIALIZACAO------------------------------------------------------------------------------
let countLineClassificaComercializacao = 0;
let arrayClassificaComercializacao = [];

function validClassificaComercializacao(classificacao_para_fins_comercializacao){
  var valid = classificacao_para_fins_comercializacao;
  if(!valid.trim()){
      return true; //permite que seja o campo seja informado como vazio apesar de estar na documentacao como obrigatorio o validador nao rejeita caso nao seja informado
  }else if (valid == 'INDIVIDUAL/FAMILIAR' || valid == 'COLETIVO EMPRESARIAL' || valid == 'COLETIVO POR ADESAO' || valid == 'COLETIVO POR ADESÃO'){
      return true;
  }else {
      return false;
  }
}

function openClassificaFinsComercial(value,numberLine){
  let upperCase = value.toUpperCase();
  if(validClassificaComercializacao(upperCase) == false){
    arrayClassificaComercializacao.push('\n'+'classificacao_para_fins_comercializacao - fora padrao RN 195/09',value,numberLine);
  }
}
  
  
function closeClassificaFinsComercial(){
  if(arrayClassificaComercializacao != ''){
    impressao.gravaNoArquivo('../file_logs/log-plano.csv',arrayClassificaComercializacao);  
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(6,openClassificaFinsComercial,closeClassificaFinsComercial,countLineClassificaComercializacao);



//REGRAS: SITUACAO_PLANO_COMERCIALIZACAO------------------------------------------------------------------------------
let countLineSituacaoPlanoComercializacao = 0;
let arraySituacaoPlanoComercializao = [];

function validSituacaoPlanoComercializacao(situacao_plano_comercializacao){
  var valid = situacao_plano_comercializacao
  if(!valid.trim()){
      return true; //permite que seja o campo seja informado como vazio apesar de estar na documentacao como obrigatorio o validador nao rejeita caso nao seja informado
  }else if (valid == 'ATIVO' || valid == 'ATIVO COM COMERCIALIZACAO SUSPENSA' || valid == 'ATIVO COM COMERCIALIZAÇAO SUSPENSA' || valid == 'CANCELADO'){
      return true;
  }else {
      return false;
  }
}

function openSituacaoPlanoComercial(value,numberLine){
  let upperCase = value.toUpperCase();
  if(validSituacaoPlanoComercializacao(upperCase) == false){
    arraySituacaoPlanoComercializao.push('\n'+'situacao_plano_comercializacao - fora padrao RN 85/04',upperCase,numberLine);
  }
}

function closeSituacaoPlanoComercial(){
  if(arraySituacaoPlanoComercializao != ''){
    impressao.gravaNoArquivo('../file_logs/log-plano.csv',arraySituacaoPlanoComercializao);  
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(7,openSituacaoPlanoComercial,closeSituacaoPlanoComercial,countLineSituacaoPlanoComercializacao);
