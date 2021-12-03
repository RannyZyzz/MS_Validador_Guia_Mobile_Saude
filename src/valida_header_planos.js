const fs = require('fs');
const readline = require('readline');
const impressao = require('../src/save_file');


async function processLineByLine(positionArray,functionFieldOpen,functionFieldClose,countLine) {
    const fileStream = fs.createReadStream('../file/planos.csv','utf-8');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
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

let arrayHeaderPlanos = ['codigo_legado','descricao','eletivo','emergencia','versao_layout','registro_plano_ans','classificacao_para_fins_comercializacao','situacao_plano_comercializacao','sequencial','empresa_id'];


let arrayValue = [];

function openCodigoLegado(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[0]){
        arrayValue.push('\n'+'campo "codigo_legado" - incorreto ou não encontrado',arrayHeaderPlanos[0],numberLine);
    }
}

function openDescricao(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[1]){
        arrayValue.push('\n'+'campo "descricao" - incorreto ou não encontrado',arrayHeaderPlanos[1],numberLine);
    }
}

function openEletivo(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[2]){
        arrayValue.push('\n'+'campo "eletivo" - incorreto ou não encontrado',arrayHeaderPlanos[2],numberLine);
    }
}

function openEmergencia(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[3]){
        arrayValue.push('\n'+'campo "emergencia" - incorreto ou não encontrado',arrayHeaderPlanos[3],numberLine);
    }
}


function openVersaoLayout(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[4]){
        arrayValue.push('\n'+'campo "versao_layout" - incorreto ou não encontrado',arrayHeaderPlanos[4],numberLine);
    }
}

function openRegistroPlanoAns(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[5]){
        arrayValue.push('\n'+'campo "registro_plano_ans" - incorreto ou não encontrado',arrayHeaderPlanos[5],numberLine);
    }
}

function openClassificacaoParaFinsComercializacao(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[6]){
        arrayValue.push('\n'+'campo "classificacao_para_fins_comercializacao" - incorreto ou não encontrado',arrayHeaderPlanos[6],numberLine);
    }
}

function openSituacaoPlanoComercializacao(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[7]){
        arrayValue.push('\n'+'campo "situacao_plano_comercializacao" - incorreto ou não encontrado',arrayHeaderPlanos[7],numberLine);
    }
}

function openSequencial(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[8]){
        arrayValue.push('\n'+'campo "sequencial" - incorreto ou não encontrado',arrayHeaderPlanos[8],numberLine);
    }
}

function openEmpresaId	(value,numberLine){
    if(value.toLowerCase() != arrayHeaderPlanos[9]){
        arrayValue.push('\n'+'campo "empresa_id" - incorreto ou não encontrado',arrayHeaderPlanos[9],numberLine);
    }
}

function closeArrayValue(){

    if(arrayValue.length > 1){
        impressao.gravaNoArquivo('../file_logs/log-header-planos.csv',arrayHeaderPlanos);
    }

    if(arrayValue != ''){
        impressao.gravaNoArquivo('../file_logs/log-header-planos.csv',arrayValue);
        arrayValue = [];
    }
}

//codigo_legado
processLineByLine(0,openCodigoLegado,closeArrayValue,0);
//descricao
processLineByLine(1,openDescricao,closeArrayValue,0);
//eletivo
processLineByLine(2,openEletivo,closeArrayValue,0);
//emergencia
processLineByLine(3,openEmergencia,closeArrayValue,0);
//versao_layout
processLineByLine(4,openVersaoLayout,closeArrayValue,0);
//registro_plano_ans
processLineByLine(5,openRegistroPlanoAns,closeArrayValue,0);
//classificacao_para_fins_comercializacao
processLineByLine(6,openClassificacaoParaFinsComercializacao,closeArrayValue,0);
//situacao_plano_comercializacao
processLineByLine(7,openSituacaoPlanoComercializacao,closeArrayValue,0);
//sequencial
processLineByLine(8,openSequencial,closeArrayValue,0);
//empresa_id
processLineByLine(9,openEmpresaId,closeArrayValue,0);
