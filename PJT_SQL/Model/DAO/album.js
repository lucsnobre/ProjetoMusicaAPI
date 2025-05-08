/****************************************************************************/
/*Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados*/
/*Data: 13/02/2024                                                          */
/*Autor: Cachorrada                                                         */
/*Versão: 1.0                                                               */
/****************************************************************************/

//Import da biblioteca do prisma/client
const {PrismaClient } = require('@prisma/client')

//Instânciando (criar novo objeto) para realizar a manipulação do Script SQL
const prisma = new PrismaClient()

//Função para inserir uma nova música no Banco de Dados
const insertAlbum = async function (album) {
    try {
      // Validate input
      if (
        !album.nome ||
        !album.lancamento ||
        !album.duracao ||
        !album.numero_faixas ||
        !album.foto_capa
      ) {
        throw new Error('Missing required fields');
      }
  
      console.log('Inserting album:', album); // Log input
  
      const sql = `
        INSERT INTO tb_album (nome, lancamento, duracao, numero_faixas, foto_capa)
        VALUES (?, ?, ?, ?, ?)
      `;
      const result = await prisma.$executeRawUnsafe(
        sql,
        album.nome,
        album.lancamento,
        album.duracao,
        album.numero_faixas,
        album.foto_capa
      );
  
      console.log('Insert result:', result); // Log result
  
      if (result > 0) {
        return true; // Successfully inserted
      } else {
        throw new Error('No rows inserted');
      }
    } catch (error) {
      console.error('DAO insertAlbum Error:', error); // Log error
      throw new Error(`Database error: ${error.message}`);
    }
  };
//Função para atualizar uma música existente no Banco de Dados
const updateAlbum = async function(album){
    try {
        let sql = `update tb_album set nome             = '${album.nome}',
                                        lancamento      = '${album.lancamento}',
                                        duracao         = '${album.duracao}',
                                        numero_faixas   = '${album.numero_faixas}',
                                        foto_capa       = '${album.foto_capa}'
                                                   
                                        
                    where id=${album.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else 
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Função para excluir uma música
const deleteAlbum = async function(){
    try {
        let sql = `DELETE FROM tb_album WHERE id = ${id}`

        
        //Execta o Script SQL no BD e aguarda o retorno dos dados.
        let result = await prisma.$queryRawUnsafe(sql)
        
        

        if(result)
            return result
        else
            return false
    } catch (error) {
        
        return false
    }
}



//Função para retornar todas as músicas do Banco de Dados
const selectAllAlbum = async function () {
    try {
      console.log('Executing selectAllAlbum'); // Log start
      const result = await prisma.tb_album.findMany({
        orderBy: { id: 'asc' },
      });
      console.log('selectAllAlbum Result:', result); // Log result
      return result; // Returns array (empty if no data)
    } catch (error) {
      console.error('DAO selectAllAlbum Error:', error); // Log error
      throw new Error(`Database error: ${error.message}`);
    }
  };


//Função para buscar uma música pelo ID no Banco de Dados
const selectByIdAlbum = async function(id){
    try {
        let sql = `SELECT * FROM tb_musica WHERE id = ${id}`;
        
        let result = await prisma.$queryRawUnsafe(sql);

        if (result && result.length > 0) {
            return result; // Retorna todos os dados da música encontrada
        } else {
            return false; // Nenhuma música encontrada
        }
    } catch (error) {
        return false;
    }
};


module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}