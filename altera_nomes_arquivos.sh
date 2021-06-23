#!/bin/bash

path=`pwd`;
file='/file';

#Procura arquivos de Especialidades
echo "Alterando arquivo: Especialidades";
find ${path}${file} -type f -name "*espec*.csv" -exec mv {} ${path}${file}/especialidades.csv \;
find ${path}${file} -type f -name "*ESPEC*.csv" -exec mv {} ${path}${file}/especialidades.csv \;
sleep 1;

#Procura arquivos de Planos
echo "Alterando arquivo: Planos";
find ${path}${file} -type f -name "*plano*.csv" -exec mv {} ${path}${file}/planos.csv \;
find ${path}${file} -type f -name "*PLANO*.csv" -exec mv {} ${path}${file}/planos.csv \;
sleep 1;

#Procura arquivos de Tipo rede credenciada
echo "Alterando arquivo: Tipo rede credenciada";
find ${path}${file} -type f -name "*tprede*.csv" -exec mv {} ${path}${file}/tipo_rede_credenciada.csv \;
find ${path}${file} -type f -name "*TPREDE*.csv" -exec mv {} ${path}${file}/tipo_rede_credenciada.csv \;
sleep 1;

#Procura arquivos de Rede Credenciada
echo "Alterando arquivo: Rede credenciada";
find ${path}${file} -type f -name "*redecred*.csv" -exec mv {} ${path}${file}/rede_credenciada.csv \;
find ${path}${file} -type f -name "*REDECRED*.csv" -exec mv {} ${path}${file}/rede_credenciada.csv \;
sleep 1;
echo "Arquivos alterados!";