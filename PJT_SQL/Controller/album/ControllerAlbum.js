/*******************************************************************************/
/*Objetivo: Controller responsável pela manipulação do CRUD de dados de música */
/*Data: 13/02/2024                                                             */
/*Autor: Cachorrada                                                            */
/*Versão: 1.0                                                                  */
/*******************************************************************************/

const MESSAGE = require('../../../Módulo/config')



//Import do arquivo DAO de música para manipular o BD
const albumDAO = require('../../Model/DAO/album')

//Função para inserir uma música
const inserirAlbum = async function(album, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')

        {

            if (
                album.nome                  == undefined || album.nome                   == '' || album.nome                 == null || album.nome.length            > 80   ||
                album.lancamento            == undefined || album.lancamento             == '' || album.lancamento           == null || album.lancamento.length      > 200  ||
                album.duracao               == undefined || album.duracao                == '' || album.duracao              == null || album.duracao.length         > 5    ||
                album.numero_faixas         == undefined || album.numero_faixas          == '' || album.numero_faixas        == null || album.numero_faixas.length   > 10   ||
                album.foto_capa             == undefined || album.foto_capa.length       > 200
            ){
           return MESSAGE.ERROR_REQUIRED_FIELDS //400
       }else{
           let resultAlbum = albumDAO.insertAlbum(album)
   
           if (resultAlbum)
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

const atualizarAlbum = async function(album, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {

            if( album.nome             == undefined || album.nome              == ''        || album.nome             == null        || album.nome.length          > 80           ||
                album.lancamento       == undefined || album.lancamento               == ''        || album.lancamento               == null        || album.lancamento.length                 > 200    ||
                album.duracao          == undefined || album.duracao                  == ''        || album.duracao                  == null        || album.duracao.length              > 5            ||
                album.numero_faixas    == undefined || album.numero_faixas            == ''        || album.numero_faixas            == null        || album.numero_faixas.length      > 10             ||
                album.foto_capa        == undefined || album.foto_capa.length         > 200        ||
                id                     == ''        || id                             == undefined || id                             == null        || isNaN(id)                                        || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultAlbum = await buscarMusica(id)

                if(resultAlbum.status_code == 200){
                    album.id = id 
                    let result = await albumDAO.updateAlbum(album) // Adicionado "await"

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultAlbum.status_code == 404){
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
const excluirAlbum = async function(id) {
    try {
        let dadosAlbum = await albumDAO.deleteAlbum(id)

        if (dadosAlbum) {
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
const listarAlbum = async function () {
    const dados = await albumDAO.selectAllAlbum();
    if (dados.length > 0) {
        return {
            dadosAlbum.status = true
            dadosAlbum.status_code = 200
            dadosAlbum.itens = resultAlbum.length
            dadosAlbum.album = resultAlbum
        };
    } else {
        return MESSAGE.ERROR_NOT_FOUND;
    }
};



//Função para buscar uma música
const buscarAlbum = async function(id) {
    try {
        // Chamar a função que retorna a música pelo ID
        let resultAlbum = await albumDAO.selectByIdAlbum(id)

        // Verificar se a função retornou um resultado válido
        if (resultAlbum && typeof resultAlbum === 'object' && resultAlbum.length > 0) {
            // Criar um objeto JSON para retornar a música encontrada
            let dadosAlbum = {
                status: true,
                status_code: 200,
                musica: resultAlbum 
            }
            return dadosAlbum // 200
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
  inserirAlbum,
  atualizarAlbum,
  excluirAlbum,
  listarAlbum,
  buscarAlbum
}