# ValidadorGuiaMobileSaude
Para que sua rede credenciada esteja disponível a todos os seus clientes através da plataforma Mobile Guia de Saúde, seus dados devem ser disponibilizados na nuvem da Mobile Saúde.


### Documentação
Importação de arquivos no padrão do "Guia Médico Mobile Saúde" 
https://mobilesaudejira.atlassian.net/wiki/spaces/PUB/pages/959217692/Guia+de+Sa+de+migrando+sua+rede+credenciada


### Necessidade
Para clientes que necessitem de validação dos arquivos, este validador em versão **BETA - Release 1.0** trata os devidos arquivos.

##### Planos;
https://mobilesaudejira.atlassian.net/wiki/spaces/PUB/pages/959217692/Guia+Sa+de+arquivos+de+importa+o#GuiaSa%C3%BAdearquivosdeimporta%C3%A7%C3%A3o-4.LayoutPLANOS-(GM_MS_PLANOS.csv)
##### Especialidades;
https://mobilesaudejira.atlassian.net/wiki/spaces/PUB/pages/959217692/Guia+Sa+de+arquivos+de+importa+o#GuiaSa%C3%BAdearquivosdeimporta%C3%A7%C3%A3o-2.LayoutESPECIALIDADES-(GM_MS_ESPEC.csv)
##### Tipo de Rede Credenciada;
https://mobilesaudejira.atlassian.net/wiki/spaces/PUB/pages/959217692/Guia+Sa+de+arquivos+de+importa+o#GuiaSa%C3%BAdearquivosdeimporta%C3%A7%C3%A3o-6.LayoutTIPODEREDECREDENCIADA-(GM_MS_TPREDE.csv)

##### Rede Credenciada**
** **Campos sendo desenvolvidos**
https://mobilesaudejira.atlassian.net/wiki/spaces/PUB/pages/959217692/Guia+Sa+de+arquivos+de+importa+o#GuiaSa%C3%BAdearquivosdeimporta%C3%A7%C3%A3o-8.LayoutREDECREDENCIADA-(GM_MS_REDECRED.csv)


### Primeiros Passos
1. Possuir NodeJS Versão 12 instalado no equipamento;
2. Baixar o projeto em sua máquina local;
3. na pasta raiz do projeto (onde se encontram os arquivos "package.json") e rodar o comando "npm ci";

### Como usar
> Importante: Sempre excluir os arquivos da pasta "file_log" a cada nova rodada de execução do validador.

1. Ter em "mãos" os arquivos referente aos:
  * Planos;
  * Especialidades;
  * Tipo de Rede;
  * Rede Credenciada;
 
2. Renomear os seguintes arquivos na pasta "file":
  * Planos >> "planos.csv"
  * Especialidades >> "especialidades.csv"
  * Tipo de Rede >> "tipo_rede_credenciada.csv"
  * Rede Credenciada >> "rede_credenciada.csv" **
  
> ** **Neste arquivo é importante abrir o arquivo no LibreOffice e substituir ";" por " "(espaço);**

3. Dentro da pasta "src" rode (recomendado) na ordem os seguintes comandos:
> Importante: Verificar as críticas pois podem influenciar na validação do arquivo de "rede_credenciada.csv"
  * $ bash valida_arquivos_carga.sh
  
4. Verificar os arquivos de log na pasta "file_logs";

5. Caso seja necessário, excluir todos os arquivos da pasta "file_logs" e rodar novamente os scripts;





# Caracteres Especiais
### Necessidade
Caso a importação do cliente seja realizada com status "REJEITADO" e não exibir o arquivo de críticas para downloads, isso significa que o arquivo possui um caracter especial que o importador java não consegue tratar e com isso quebra a importação, este script visa achar a linha que apresenta o caracter "especial" e assim poder ser tratado.

### Primeiros Passos
1. Possuir NodeJS Versão 12 instalado no equipamento;
2. Baixar o projeto em sua máquina local;
3. na pasta raiz do projeto (onde se encontram os arquivos "package.json") e rodar o comando "npm ci";


### Como usar
> Importante-1: Sempre excluir os arquivos da pasta "file_log" a cada nova rodada de execução do validador.

> Importante-2: Caso exista a necessidade de verificar mais de um arquivo faça a verificação um arquivo por vez.


1. Ter em "mãos" os arquivos referente aos:
  * Planos;
  * Especialidades;
  * Tipo de Rede;
  * Rede Credenciada;
  
 
2. Colocar o arquivo desejado na pasta "file":
  * Renomeie o arquivo para "find_character.csv";
  
     *Exemplo: "plano.csv" para "find_character.csv";*
     

3. Dentro da pasta "src" rode o comando:
  * $ node find_character.js
  

4. Verificar os arquivos "log-find.character.csv" na pasta "file_logs";

*A ultima coluna do arquivo de log é referente a linha do arquivo*


5. Caso seja necessário, excluir o  arquivo da pasta "file_logs" e rodar novamente o script;
