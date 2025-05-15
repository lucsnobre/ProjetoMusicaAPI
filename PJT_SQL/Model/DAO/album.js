/****************************************************************************/
/*Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados*/
/*Data: 13/02/2024                                                          */
/*Autor: Cachorrada                                                         */
/*Versão: 1.0                                                               */
/****************************************************************************/

//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prima client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo album
const insertAlbum = async function(album){
    try {
      let sql = `insert into tb_album (
                                          nome,
                                          lancamento, 
                                          duracao, 
                                          numero_faixas,
                                          foto_capa,

                                        )
                values                 ( 
                                          '${album.nome}',
                                          '${album.lancamento}',
                                          '${album.duracao}', 
                                          '${album.numero_faixas}',
                                          '${album.foto_capa}  
                                        )`

      //Executa o script SQL no bancod e dados e aguarda o resultado final (true ou false)
      let result = await prisma.$executeRawUnsafe(sql)

      if (result)
          return true
      else
          return false //Bug no Banco de Dados

    } catch (error){
      return false //Bug de programação
    }
  
}

//Função para atualizar um album já existente
const updateAlbum = async function(album){
  try {
    let sql = `update tbl_albuns set      nome                = '${album.nome}',
                                          lancamento            = '${album.capa_url}', 
                                          duracao     = '${album.data_lancamento}', 
                                          numero_faixas            = '${album.id_banda}',
                                          foto_capa = '${album.foto_capa}',
                                          id_genero = '${album.id_genero}',
                                          id_musica = '${album.id_musica}',
                                          id_premio = '${album.id_premio}',
                                          id_artista = '${album.id_artista}'
                                  where id_album = ${album.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else
      return false                    
  } catch (error) {
    return false
  }
}

//Função para excluir um album já existente
const deleteAlbum = async function(id){
  try {
    //Script SQL
    let sql = `delete from tbl_albuns where id_album = ${id}`

    //Encaminha o script SQL para o Banco de Dados
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
      return true //Retorna true caso tenha dado certo
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todas os albuns do BD
const selectAllAlbuns = async function(){
    try {

      //Script SQL
      let sql = 'select * from tb_album order by id_album desc'

      //Encaminha o script SQL para o Banco de Dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result //Retorna os dados do banco
      else 
        return false
    } catch (error) {
      return false
    }
}

//Função para buscar uma album pelo ID
const selectByIdAlbum = async function(id){
  try {
    //Script SQL
    let sql = `select * from tbl_albuns where id_album = ${id}`

    //Encaminha o script SQL para o Banco de Dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result //Retorna os dados do banco
    else 
      return false
  } catch (error) {
    return false
  }
}

module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbuns,
    selectByIdAlbum
}