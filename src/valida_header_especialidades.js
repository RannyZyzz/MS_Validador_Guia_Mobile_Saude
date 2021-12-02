const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(positionArray,functionFieldOpen,functionFieldClose,countLine) {
    const fileStream = fs.createReadStream('../file/especialidades.csv','utf-8');

    const rl = readline.createInterface({
        input:  fileStream,
        crlfDelay:  Infinity
    });

    for await (const line of rl) {
        countLine +=1;
        if(countLine == 1){
            let splitLinha = line.split(';');
            let replaceLinha = splitLinha[positionArray].toString().replace(/"/gi,'');
            let fileField = replaceLinha;
            functionFieldOpen(fileField,countLine);
        }
    }
    functionFieldClose();

    rl.close();
    rl.removeAllListeners();
}

//Valida Headers - Coluna CBO;
let arrayCodigoCBO = [];

function openCodigoCbo(value,numberLine){
    if(value.toLowerCase() != 'codigo_cbo'){
        arrayCodigoCBO.push('\n'+'campo "codigo_cbo" - incorreto ou não encontrado',value,numberLine);
        console.log(value);
    }
}

function closeCodigoCbo(){
    if(arrayCodigoCBO != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayCodigoCBO);
    }
}

processLineByLine(0,openCodigoCbo,closeCodigoCbo,0);



//Valida Headers - descricao;
let arrayDescricao = [];

function openDescricao(value,numberLine){
    if(value.toLowerCase() != 'descricao'){
        arrayDescricao.push('\n'+'campo "descricao" - incorreto ou não encontrado',value,numberLine);
        console.log(value);
    }
}

function closeDescricao(){
    if(arrayDescricao != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayDescricao);
    }
}

processLineByLine(1,openDescricao,closeDescricao,0);




//Valida Headers - versao_layout;
let arrayVersaoLayout = [];

function openVersaoLayout(value,numberLine){
    if(value.toLowerCase() != 'versao_layout'){
        arrayVersaoLayout.push('\n'+'campo "versao_layout" - incorreto ou não encontrado',value,numberLine);
        console.log(value);
    }
}

function closeVersaoLayout(){
    if(arrayVersaoLayout != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayVersaoLayout);
    }
}

processLineByLine(2,openVersaoLayout,closeVersaoLayout,0);



//Valida Headers - empresa_id;
let arrayEmpresaId = [];

function openEmpresaId(value,numberLine){
    if(value.toLowerCase() != 'empresa_id'){
        arrayEmpresaId.push('\n'+'campo "empresa_id" - incorreto ou não encontrado',value,numberLine);
        console.log(value);
    }
}

function closeEmpresaId(){
    if(arrayEmpresaId != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayEmpresaId);
    }
}

processLineByLine(3,openEmpresaId,closeEmpresaId,0);