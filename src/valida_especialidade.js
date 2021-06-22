const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(positionArray,functionFieldOpen,functionFieldClose,countLine) {
  const fileStream = fs.createReadStream('../file/especialidades.csv','UTF-8');

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
let codigoCboRepetido = [];
let codigoCboArquivo = [];
let countLineCodigoLegado = 0;

function openCodigoLegado(value){
    codigoCboRepetido.push(value);   
}
function closeCodigoLegado(){
    codigoCboRepetido.filter(function(elem,pos,self){
        if(self.indexOf(elem) == pos){
            return true;
        }else{
            codigoCboArquivo.push('\n'+'codigo_legado - CBO duplicado',elem,self.indexOf(elem)+2)
        }
    })
    if(codigoCboArquivo != ''){
        impressao.gravaNoArquivo('../file_logs/log-especialidade.csv',codigoCboArquivo)
    }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(0,openCodigoLegado,closeCodigoLegado,countLineCodigoLegado);


//REGRA: CODIGO_LEGADO--------------------------------------------------------------------------------------------------------
let countLineDescricao = 0;
let arrayDescricao = [];

function openDescricao(value,numberLine){
    if(!value.trim()){
        arrayDescricao.push('\n'+'descricao - em branco ou vazia',null,numberLine);
    }
  }

function closeDescricao(){
    if(arrayDescricao != ''){
        impressao.gravaNoArquivo('../file_logs/log-especialidade.csv',arrayDescricao);
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
      impressao.gravaNoArquivo('../file_logs/log-especialidade.csv',arrayVersaoLayout);
    }
  }
  //EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
  processLineByLine(2,openVersaoLayout,closeVersaoLayout,countLineVersaoLayout);