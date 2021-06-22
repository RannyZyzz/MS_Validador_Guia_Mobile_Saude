#!/bin/bash
#!/usr/bin/env node

path=`pwd`;
src='/src/';
file_logs='/file_logs/';

#remove arquivos que estão na pasta file_logs
rm -rf ${path}${file_logs}/*.csv
echo "Apagando arquivos da pasta: file_logs";
sleep 1;
echo "-";
sleep 1;
echo "--";
sleep 1;
echo "---";
echo "Apagados!"
echo "Começando geração de novos arquivos"
sleep 2;

### Roda scritps de validação
echo "Arquivo: Especialidades";
cd ${path}${src}; time node valida_especialidade.js
echo "---------------------";
echo "Arquivo: Planos";
cd ${path}${src}; time node valida_plano.js
echo "---------------------";
echo "Arquivo: Tipo de Rede Credenciada";
cd ${path}${src}; time node valida_tipo_rede_credenciada.js
echo "---------------------";
echo "Arquivo: Rede Credenciada"; 
cd ${path}${src}; time node valida_rede_credenciada.js
sleep 1;
echo "---------------------";
echo "Arquivos gerados e disponibilizados na pasta: file_logs";

