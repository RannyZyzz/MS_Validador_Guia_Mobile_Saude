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

let arrayHeaderEspecialidades = ['codigo_cbo','descricao','versao_layout','empresa_id'];

let arrayValue = [];

function openCodigoCbo(value,numberLine){
    if(value.toLowerCase() != arrayHeaderEspecialidades[0]){
        arrayValue.push('\n'+'campo "codigo_cbo" - incorreto ou não encontrado',arrayHeaderEspecialidades[0],numberLine);
    }
};

function openDescricao(value,numberLine){
    if(value.toLowerCase() != arrayHeaderEspecialidades[1]){
        arrayValue.push('\n'+'campo "descricao" - incorreto ou não encontrado',arrayHeaderEspecialidades[1],numberLine);
    }
};

function openVersaoLayout(value,numberLine){
    if(value.toLowerCase() != arrayHeaderEspecialidades[2]){
        arrayValue.push('\n'+'campo "versao_layout" - incorreto ou não encontrado',arrayHeaderEspecialidades[2],numberLine);
    }
};

function openEmpresaId(value,numberLine){
    if(value.toLowerCase() != arrayHeaderEspecialidades[3]){
        arrayValue.push('\n'+'campo "empresa_id" - incorreto ou não encontrado',arrayHeaderEspecialidades[2],numberLine);
    }
};

function closeArrayValue(){
    
    if(arrayValue.length > 1){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayHeaderEspecialidades);
    }

    if(arrayValue != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-especialidades.csv',arrayValue);
        arrayValue = [];
    }
}

//codigo_cbo
processLineByLine(0,openCodigoCbo,closeArrayValue,0);
//descricao
processLineByLine(1,openDescricao,closeArrayValue,0);
//versao_layout
processLineByLine(2,openVersaoLayout,closeArrayValue,0);
//empresa_id
processLineByLine(3,openEmpresaId,closeArrayValue,0);