/*******************************************************************************/
/*Objetivo: Controller responsável pela manipulação do CRUD de dados de música */
/*Data: 13/02/2024                                                             */
/*Autor: Cachorrada                                                            */
/*Versão: 1.0                                                                  */
/*******************************************************************************/

const MESSAGE = require('../../../Módulo/config')



//Import do arquivo DAO de música para manipular o BD
const generoDAO = require('../../Model/DAO/genero')

//Função para inserir uma música
const inserirGenero = async function(genero, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')

        {

        if(  genero.nome                 == undefined   ||
             genero.nome                 == ''          || 
             genero.nome                 == null        || 
             genero.nome.length          > 80          
       ){
           return MESSAGE.ERROR_REQUIRED_FIELDS
       }else{
           let resultGenero = generoDAO.insertGenero(genero)
   
           if (resultGenero)
               return MESSAGE.SUCESS_CREATED_ITEM //201
           else
               return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
       }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para atualizar uma música
//Função para atualizar uma música
const atualizarMusica = async function(genero, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {

            if( genero.nome             == undefined || genero.nome              == ''        || genero.nome             == null        || genero.nome.length          > 80     ||
                id                            == ''  || id == undefined                       || id == null                             || isNaN(id)                            || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultGenero = await selectByIdGenero(id)

                if(resultGenero.status_code == 200){
                    genero.id = id 
                    let result = await generoDAO.updateGenero(generoDAO) // Adicionado "await"

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
} 


//Função para excluir uma música
const excluirGenero = async function(id) {
    try {
        let dadosGenero = await generoDAO.excluirGenero(id)

        if (dadosGenero) {
            return {
                status: true,
                status_code: 200,
                message: "Música deletada com sucesso."
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404 
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500 
    }
}


//Função para listar uma música
const listarGeneros = async function(){
    try {
        let dadosGenero = {}
        //Chamar a função que retorna todas as músicas
        let resultGenero = await generoDAO.listarGeneros()

        if (resultGenero != false || typeof(resultGenero) == 'object')

        
    
    if (resultGenero != false){
        if(resultGenero.length > 0){
            //Criando um objeto JSON para retornar a lista de músicas
            dadosGenero.status = true
            dadosGenero.status_code = 200
            dadosGenero.itens = resultGenero.length
            dadosGenero.musica = resultGenero
            
            
            return dadosGenero //200
        }else{
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    }else{
        
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
    
    
    
    
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
    
}

//Função para buscar uma música
const buscarGenero = async function(id) {
    try {
        // Chamar a função que retorna a música pelo ID
        let resultGenero = await generoDAO.buscarGenero(id)

        // Verificar se a função retornou um resultado válido
        if (resultGenero && typeof resultGenero === 'object' && resultGenero.length > 0) {
            // Criar um objeto JSON para retornar a música encontrada
            let dadosGenero = {
                status: true,
                status_code: 200,
                musica: resultMusica 
            }
            return dadosGenero // 200
        } else {
            // Retornar mensagem de erro caso a música não seja encontrada
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        // Retornar mensagem de erro interno do servidor em caso de exceção
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}




module.exports = {
  inserirGenero,
  atualizarMusica,
  excluirGenero,
  listarGeneros,
  buscarGenero
}