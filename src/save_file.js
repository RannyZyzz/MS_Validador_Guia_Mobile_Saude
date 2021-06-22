const fs = require('fs');

module.exports = {
    gravaNoArquivo(tipoArquivo,array){
        fs.appendFile(tipoArquivo, array, function(err, result) {
            if(err) console.log('error', err);
        });
    }
}
