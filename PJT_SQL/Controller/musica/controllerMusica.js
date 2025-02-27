/*******************************************************************************/
/*Objetivo: Controller responsável pela manipulação do CRUD de dados de música */
/*Data: 13/02/2024                                                             */
/*Autor: Cachorrada                                                            */
/*Versão: 1.0                                                                  */
/*******************************************************************************/

const MESSAGE = require('../../../Módulo/config')
const { ERROR_INTERNAL_SERVER } = require('../../../Módulo/config')


//Import do arquivo DAO de música para manipular o BD
const musicaDAO = require('../../Model/DAO/musica')

//Função para inserir uma música
const inserirMusica = async function(musica){
    try {
        if(  musica.nome_musica             == undefined || musica.nome_musica                     == ''        || musica.nome_musica                     == null        || musica.nome_musica.lenght                 > 80     ||
            musica.link             == undefined || musica.link                     == ''        || musica.link                     == null        || musica.link.lenght                 > 200    ||
            musica.duracao          == undefined || musica.duracao                  == ''        || musica.duracao                  == null        || musica.duracao.lenght              > 5      ||
            musica.data_lancamento  == undefined || musica.data_lancamento          == ''        || musica.data_lancamento          == null        || musica.data_lancamento.lenght      > 10     ||
            musica.foto_capa        == undefined || musica.foto_capa.lenght         > 200        ||
            musica.letra            == undefined
       ){
           return MESSAGE.ERROR_REQUIRED_FIELDS
       }else{
           let resultMusica = musicaDAO.insertMusica(musica)
   
           if (resultMusica)
               return MESSAGE.SUCESS_CREATED_ITEM //201
           else
               return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
       }
    
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para atualizar uma música
const atualizarMusica = async function(){
    
}

//Função para excluir uma música
const excluirMusica = async function(){
    
}

//Função para listar uma música
const listarMusica = async function(){
    
}

//Função para buscar uma música
const buscarMusica = async function(){
    
}

module.exports = {
  inserirMusica,
  atualizarMusica,
  excluirMusica,
  listarMusica,
  buscarMusica
}