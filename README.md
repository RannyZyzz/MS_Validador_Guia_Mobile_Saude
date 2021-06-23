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
1. Possuir NodeJS Versão 12 instalado no equipamento (utilize o NVM para manipular o $PATH para alterar a versão vigente do Node em seu equipamento)
2. Baixar o projeto em sua máquina local;
3. na pasta raiz do projeto (onde se encontram os arquivos "package.json") e rodar o comando "npm ci";

### Commitar no projeto
Foi adicionada ferramenta de padronização de commit, ao comitar utilize o comando:

>"npx cz" ou "npm rum commit" (caso utilize o yarn basta substituir)

Se faz utilização das convenções da comunidade para commit pelas documentações:
https://commitlint.js.org/#/concepts-commit-conventions

Porém o uso da mesma apartir do comando é muito intuitiva:

![image](https://user-images.githubusercontent.com/44988166/123156435-a919ca80-d43f-11eb-9677-aaf642b9ffcb.png)


### Como usar

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
  
  ** **Atenção**
> ** **Em caso de erros verique os arquivos e substitua ";" (ponto e virgula por " "(espaço), este caracter é de uso exclusivo pra delimitar as colunas;**

3. Dentro da pasta raiz do projeto rode o comando:
  * $ bash valida_arquivos_carga.sh
  
4. Verificar os arquivos de log na pasta "file_logs";

5. Em caso de nova necessidade de novos testes executar o passso 3 novamente;




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
