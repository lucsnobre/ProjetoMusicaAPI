/**************************************************************************************************************************/
/*Objetivo: Arquivo de configuração do projeto, onde teremos mensagens padronizadas,                                      */
/*     variáveis e constantes para o projeto.                                                                             */
/*Data: 13/02/2024                                                                                                        */
/*Autor: Cachorrada                                                                                                       */
/*Versão: 1.0                                                                                                             */
/**************************************************************************************************************************/

/********************************MENSAGENS DE STATUS CODE PARA API********************************/

/********************************MENSAGENS DE ERRO********************************/
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos obrigatórios não preenchidos.'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor de controle de dados (controller),não foi possível processar a requisição.'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor de modelagem de dados, não foi possível processar a requisição'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois os tipos de dados encaminhados não são aceitos na API. Você deve encaminhar apenas JSON.'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens para retorno.'}

/************************ MENSAGENS DE SUCESSO *************************************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso."}
const SUCESS_DELETED_ITEM = {status: true, status_code: 200, message: "Item excluído com HAXIXE."}
const SUCESS_UPDATED_ITEM = {status: true, status_code: 200, message: "Item atualizado com sucesso."}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_DELETED_ITEM,
    SUCESS_UPDATED_ITEM
}
