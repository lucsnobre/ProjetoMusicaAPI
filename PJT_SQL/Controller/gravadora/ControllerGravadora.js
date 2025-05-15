/*******************************************************************************/
/*Objetivo: Controller responsável pela manipulação do CRUD de dados de música */
/*Data: 13/02/2024                                                             */
/*Autor: Cachorrada                                                            */
/*Versão: 1.0                                                                  */
/*******************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../../Módulo/config.js')


//Import do DAO para realizar o CRUD no Banco de dados
const gravadoraDAO = require('../../Model/DAO/gravadora.js')




//Função para inserir uma nova música
const inserirGravadora = async function (gravadora, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 45 ||
                gravadora.fundacao == '' || gravadora.fundacao == null || gravadora.fundacao == undefined ||
                gravadora.sede == '' || gravadora.sede == null || gravadora.sede == undefined 
            ) {
                return message.ERROR_REQUIRED_FIELDS //Status code 400
            } else {
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let result = await gravadoraDAO.insertNovaGravadora(gravadora)

                if (result) {
                    return message.SUCESS_CREATED_ITEM //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 que retorna caso haja erro na MODEL
                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415 que retorna o erro do tipo de conteúdo do header
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 que retorna caso haja erro CONTROLLER
    }


}

//Função para atulizar uma música existente
const atualizarGravadora = async function (id, gravadora, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 45 ||
                gravadora.fundacao == '' || gravadora.fundacao == null || gravadora.fundacao == undefined ||
                gravadora.sede == '' || gravadora.sede == null || gravadora.sede == undefined ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS //Status code 400
            } else {
                //Verifica se o ID existe no BD
                let result = await gravadoraDAO.selectByIDGravadora(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        //Update

                        //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                        album.id = id
                        let resultGravadora = await gravadoraDAO.updateGravadora(gravadora)
                        if (resultGravadora) {
                            return message.SUCESS_UPDATED_ITEM //200
                        } else {
                            return message.ERROR_NOT_FOUND //404
                        }
                    }

                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



//Função para excluir um artista existente.
const excluirGravadora = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultGravadora = await gravadoraDAO.selectByIDGravadora(id)
            if (resultGravadora != false || typeof (resultGravadora) == 'object') {
                if (resultGravadora.length > 0) {
                    //Delete
                    let result = await gravadoraDAO.deleteGravadora(id)

                    if (result) {
                        return message.SUCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }

        }
    } catch (error) {
        //Sempre que há problemas na controller
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar uma lista de músicas
const listarGravadora = async function () {

    let arrayGravadora = []


    //Objeto JSON
    let dadosGravadora = {}

    try {
        let result = await gravadoraDAO.selectAllGravadora()

        if (result != false || typeof (result) == 'object') {
            if (result.length > 0) {
                //Cria um JSON para colocar o array de músicas
                dadosGravadora.status = true,
                dadosGravadora.status_code = 200,
                dadosGravadora.items = result.length
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar um Artista pelo seu ID
const buscarGravadoras = async function (id) {
    try {

        let arrayGravadora = []

        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Objeto JSON
            let dadosGravadora = {}
            let result = await gravadoraDAO.selectByIDGravadora(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {
                    //Cria um JSON para colocar o array de músicas
                    dadosGravadora.status = true,
                    dadosGravadora.status_code = 200
                    // dadosAlbum.usuarios = result

                    return dadosGravadora //200
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}




module.exports = {
    inserirGravadora,
    atualizarGravadora,
    excluirGravadora,
    listarGravadora,
    buscarGravadoras
}