const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(fileImport,positionArray,functionFieldOpen,functionFieldClose,countLine) {
  const fileStream = fs.createReadStream(fileImport,'UTF-8');

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

//REGRA: CODIGO_CBO *************************
//IMPORTANDO OS CODIGOS CBO DO ARQUIVO DE ESPECIALIDADES PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileEspecialidades = '../file/especialidades.csv';
let fileEspecialidesCodigoCbo = [];
let countLineEspecialidadesCodigoCbo = 0;


function openEspecialidadesCodigoCbo(value){
    fileEspecialidesCodigoCbo.push(value);   
}

function closeEspecialidadesCodigoCbo(){
    return true;
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileEspecialidades,0,openEspecialidadesCodigoCbo,closeEspecialidadesCodigoCbo,countLineEspecialidadesCodigoCbo);



//IMPORTANDO OS CODIGOS CBO DO ARQUIVO DE REDE CREDENCIADA PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileRedeCredenciada = '../file/rede_credenciada.csv';
let fileRedeCredenciadaCodigoCbo = [];
let fileSaveCodigoCbo = [];
let countLineRedeCredenciadaCodigoCbo = 0;

function openRedeCredenciadaCodigoCbo(value){
    fileRedeCredenciadaCodigoCbo.push(value);   
}

function closeRedeCredenciadaCodigoCbo(){
    for (var i =0 ; i < fileRedeCredenciadaCodigoCbo.length; i++){
        if(fileEspecialidesCodigoCbo.indexOf(fileRedeCredenciadaCodigoCbo[i]) == -1 ){
            fileSaveCodigoCbo.push('\n'+'codigo_cbo - Incorreto',fileRedeCredenciadaCodigoCbo[i],i+2);
        }
    }
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',fileSaveCodigoCbo);
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,0,openRedeCredenciadaCodigoCbo,closeRedeCredenciadaCodigoCbo,countLineRedeCredenciadaCodigoCbo);






//REGRA: CODIGO_PLANO *************************
//IMPORTANDO OS CODIGOS PLANO DO ARQUIVO DE PLANOS PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let filePlanos = '../file/planos.csv';
let filePlanosCodigoPlano = [];
let countLinePlanosCodigoPlano = 0;


function openPlanosCodigoPlano(value){
    filePlanosCodigoPlano.push(value);   
}

function closePlanosCodigoPlano(){
    return true;
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(filePlanos,0,openPlanosCodigoPlano,closePlanosCodigoPlano,countLinePlanosCodigoPlano);



//IMPORTANDO OS CODIGOS LEGADO DO ARQUIVO DE REDE CREDENCIADA PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileRedeCredenciadaCodigoPlano = [];
let fileSaveCodigoPlano = [];
let countLineRedeCredenciadaCodigoPlano = 0;

function openRedeCredenciadaCodigoPlano(value){
    fileRedeCredenciadaCodigoPlano.push(value);   
}

function closeRedeCredenciadaCodigoPlano(){
    for (var i =0 ; i < fileRedeCredenciadaCodigoPlano.length; i++){
        if(filePlanosCodigoPlano.indexOf(fileRedeCredenciadaCodigoPlano[i]) == -1 ){
            fileSaveCodigoPlano.push('\n'+'codigo_plano - Incorreto',fileRedeCredenciadaCodigoPlano[i],i+2);
        }
    }
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',fileSaveCodigoPlano);
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,1,openRedeCredenciadaCodigoPlano,closeRedeCredenciadaCodigoPlano,countLineRedeCredenciadaCodigoPlano);



//REGRA: CLASSE_PRESTADOR *************************
//IMPORTANDO CLASSE PRESTADOR DO ARQUIVO DE TIPO DE PRESTADOR PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileTipoPrestador = '../file/tipo_rede_credenciada.csv';
let fileTipoClassePrestador = [];
let countLineTipoClassePrestador = 0;


function openTipoClassePrestador(value){
    fileTipoClassePrestador.push(value);   
}

function closeTipoClassePrestador(){
    return true;
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileTipoPrestador,0,openTipoClassePrestador,closeTipoClassePrestador,countLineTipoClassePrestador);



//IMPORTANDO CLASSE PRESTADOR DO ARQUIVO DE REDE CREDENCIADA PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileRedeCredenciadaClassePrestador = [];
let fileSaveClassePrestador = [];
let countLineRedeCredenciadaClassePrestador = 0;

function openRedeCredenciadaClassePrestador(value){
    fileRedeCredenciadaClassePrestador.push(value);   
}

function closeRedeCredenciadaClassePrestador(){
    for (var i =0 ; i < fileRedeCredenciadaClassePrestador.length; i++){
        if(fileTipoClassePrestador.indexOf(fileRedeCredenciadaClassePrestador[i]) == -1 ){
            fileSaveClassePrestador.push('\n'+'classe_prestador - Incorreto',fileRedeCredenciadaClassePrestador[i],i+2);
        }
    }
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',fileSaveClassePrestador);
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,2,openRedeCredenciadaClassePrestador,closeRedeCredenciadaClassePrestador,countLineRedeCredenciadaClassePrestador);



//REGRAS: CODIGO_LEGADO--------------------------------------------------------------------------------------------------
let countLineCodigoLegado = 0;
let arrayCodigoLegado = [];

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

function openCodigoLegado(value,numberLine){
  if(!value.trim() || isAlphaNumeric(value) == false){
    arrayCodigoLegado.push('\n'+'codigo_legado - nao eh alfanumerico ou em branco',value,numberLine);
  }
}

function closeCodigoLegado(){  
  if(arrayCodigoLegado != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayCodigoLegado);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,3,openCodigoLegado,closeCodigoLegado,countLineCodigoLegado);





//REGRA: NOME_PRESTADOR------------------------------------------------------------------------------------------------------------------------
let countLineNomePrestador = 0;
let arrayNomePrestador = [];

function openNomePrestador(value,numberLine){
  if(!value.trim()){
      arrayNomePrestador.push('\n'+'nome_prestador - em branco ou vazia',null,numberLine);
  }
}

function closeNomePrestador(){
  if(arrayNomePrestador != ''){
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayNomePrestador);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,4,openNomePrestador,closeNomePrestador,countLineNomePrestador);



//REGRA: ENDERECO------------------------------------------------------------------------------------------------------------------------
let countLineEndereco = 0;
let arrayEndereco = [];

function openEndereco(value,numberLine){
  if(!value.trim()){
      arrayEndereco.push('\n'+'endereco - em branco ou vazia',null,numberLine);
  }
}

function closeEndereco(){
  if(arrayEndereco != ''){
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayEndereco);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,6,openEndereco,closeEndereco,countLineEndereco);



//REGRAS: NUMERO--------------------------------------------------------------------------------------------------
let countLineNumeroEndereco = 0;
let arrayNumeroEndereco = [];

function openNumeroEndereco(value,numberLine){
    let upperCase = value.toUpperCase();
    if(!upperCase.trim()){
        arrayNumeroEndereco.push('\n'+'numero - conteúdo está em branco',value,numberLine);
    }
}

function closeNumeroEndereco(){  
  if(arrayNumeroEndereco != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayNumeroEndereco);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,7,openNumeroEndereco,closeNumeroEndereco,countLineNumeroEndereco);


//REGRAS: BAIRRO--------------------------------------------------------------------------------------------------
let countLineBairro = 0;
let arrayBairro = [];

function openBairro(value,numberLine){
    let upperCase = value.toUpperCase();
    if(!upperCase.trim()){
        arrayBairro.push('\n'+'bairro - conteúdo está em branco',upperCase,numberLine);
    }
}

function closeBairro(){  
  if(arrayBairro != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayBairro);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,9,openBairro,closeBairro,countLineBairro);




//REGRA: CODIGO_MUNICIPIO *************************
//IMPORTANDO OS CODIGOS MUNICIPIO DO ARQUIVO CSV PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileCodigoMunicipio = '../src/codigo_municipio.csv';
let fileIBGECodigoMunicipio = [];
let countLineIBGECodigoMunicipio = 0;


function openIBGECodigoMunicipio(value){
    fileIBGECodigoMunicipio.push(value);   
}

function closeIBGECodigoMunicipio(){
    return true;
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileCodigoMunicipio,0,openIBGECodigoMunicipio,closeIBGECodigoMunicipio,countLineIBGECodigoMunicipio);



//IMPORTANDO OS CODIGOS MUNICIPIO DO ARQUIVO DE REDE CREDENCIADA PARA DENTRO DE ARRAY--------------------------------------------------------------------------------
let fileRedeCredenciadaCodigoMunicipio = [];
let fileSaveCodigoMunicipio = [];
let countLineRedeCredenciadaCodigoMunicipio = 0;

function openRedeCredenciadaCodigoMunicipio(value){
    fileRedeCredenciadaCodigoMunicipio.push(value);   
}

function closeRedeCredenciadaCodigoMunicipio(){
    for (var i =0 ; i < fileRedeCredenciadaCodigoMunicipio.length; i++){
        if(fileIBGECodigoMunicipio.indexOf(fileRedeCredenciadaCodigoMunicipio[i]) == -1 ){
            fileSaveCodigoMunicipio.push('\n'+'codigo_municipio - Incorreto',fileRedeCredenciadaCodigoMunicipio[i],i+2);
        }
    }
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',fileSaveCodigoMunicipio);
}
//EXECUÇÃO das regras do campo > funcao("arquivo a ser lido","posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,10,openRedeCredenciadaCodigoMunicipio,closeRedeCredenciadaCodigoMunicipio,countLineRedeCredenciadaCodigoMunicipio);



//REGRAS: CODIGO_UF--------------------------------------------------------------------------------------------------
let codigoUF = ['RO','AC','AM','RR','PA','AP','TO','MA','PI','CE','RN','PB','PE','AL','SE','BA','MG','ES','RJ','SP','PR','SC','RS','MS','MT','GO','DF']
let countCodigoUF = 0;
let arrayCodigoUF = [];
let fileSaveCodigoUF = [];

function openCodigoUF(value,numberLine){
    let upperCase = value.toUpperCase();
    arrayCodigoUF.push(upperCase);
}

function closeCodigoUF(){  
    for (var i =0 ; i < arrayCodigoUF.length; i++){
        if(codigoUF.indexOf(arrayCodigoUF[i]) == -1 ){
            fileSaveCodigoUF.push('\n'+'codigo_UF - Incorreto',arrayCodigoUF[i],i+2);
        }
    }
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',fileSaveCodigoUF);
}

//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,11,openCodigoUF,closeCodigoUF,countCodigoUF);




//REGRAS: CEP--------------------------------------------------------------------------------------------------
let countLineCEP = 0;
let arrayCEP = [];

function isCEP(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code == 45 )// code (-)
        ) { 
      return false;
    }
  }
  return true;
};

function openCEP(value,numberLine){
  if(!value.trim() || isCEP(value) == false){
    arrayCEP.push('\n'+'CEP - nao eh um CEP válido',value,numberLine);
  }
}

function closeCEP(){  
  if(arrayCEP != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayCEP);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,12,openCEP,closeCEP,countLineCEP);




//REGRAS: CPF_CNPJ--------------------------------------------------------------------------------------------------

function validaCpfCnpj(val) {
    if (val.length == 11) {
        var cpf = val

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 == 10) {
            v1 = 0;
        }

        if (v1 != cpf[9]) {
            return false;
        }

        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 == 10) {
            v2 = 0;
        }

        if (v2 != cpf[10]) {
            return false;
        } else {
            return true;
        }
    } else if (val.length == 14) {
        var cnpj = val

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }

        if (v1 != cnpj[12]) {
            return false;
        }

        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }

        if (v2 != cnpj[13]) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
 }


let countLineCpfCnpj = 0;
let arrayCpfCnpj = [];


function openCpfCnpj(value,numberLine){
    let replacePonto = value.toString().replace(/[.]/gi,'');
    let replaceTraco = replacePonto.toString().replace(/[-]/gi,'');
    let replaceBarra = replaceTraco.toString().replace(/[/]/gi,'');
    let cpfCnpj = replaceBarra;
    if(!cpfCnpj.trim() || validaCpfCnpj(cpfCnpj) == false){
    arrayCpfCnpj.push('\n'+'CPF/CNPJ - inválido',value,numberLine);
  }
}

function closeCpfCnpj(){  
  if(arrayCpfCnpj != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayCpfCnpj);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,18,openCpfCnpj,closeCpfCnpj,countLineCpfCnpj);




//REGRAS: SEQUENCIAL_ENDERECO--------------------------------------------------------------------------------------------------
let countLineSequencialEndereco = 0;
let arraySequencialEndereco = [];


function openSequencialEndereco(value,numberLine){
  if(!value.trim() || isAlphaNumeric(value) == false){
    arraySequencialEndereco.push('\n'+'sequencial_endereco - inválido ou em branco',value,numberLine);
  }
}

function closeSequencialEndereco(){  
  if(arraySequencialEndereco != ''){
      impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arraySequencialEndereco);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,22,openSequencialEndereco,closeSequencialEndereco,countLineSequencialEndereco);



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
    impressao.gravaNoArquivo('../file_logs/log-rede-credenciada.csv',arrayVersaoLayout);
  }
}
//EXECUÇÃO das regras do campo > funcao("posicao arquivo","Regras do campo", "gravar no arquivo", "Contador de linha")
processLineByLine(fileRedeCredenciada,26,openVersaoLayout,closeVersaoLayout,countLineVersaoLayout);

