/****************************************************************************/
/*Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados*/
/*Data: 13/02/2024                                                          */
/*Autor: Cachorrada                                                         */
/*Versão: 1.0                                                               */
/****************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo genero
const insertNovaGravadora = async function (gravadora) {
    try {

        let sql = `insert into tbl_albuns
    (   nome,
        data_lancamento,
        duracao,
        numero_faixas,
        foto_capa
    )
    values(  '${album.nome}',
             '${album.fundacao}',
             '${album.sede}',
             `
        //Executa o script SQL no banco de dados e AGUARDA o resultado (retorna um true ou false)
        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false //Bug no banco de dados

    } catch (error) {
        return false //Bug de programação.
    }

}

//Função para atualizar uma genero já existente
const updateGravadora = async function (album) {
    try {
        let sql = `update tb_album set 
        nome            =             '${album.nome}',
        fundacao        =             '${album.fundacao}',
        sede            =             '${album.duracao}',
        where id        =              ${album.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true //Pega os bug do banco e manda pa nois
        else
            return false //Deu pau em algo do banco

    } catch (error) {
        return false //Bug de Programação
    }

}

//Função para excluir um genero que já existe
const deleteGravadora = async function (id) {
    try {
        //Script SQL
        let sql = `delete from tb_gravadora where id = ${id}`

        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados

    } catch (error) {
        return false //Bug de programação.
    }
}

//Função para retonar todas as músicas do Banco
const selectAllGravadora = async function () {
    try {
        //Script SQL
        let sql = 'select * from tb_gravadora order by id desc'

        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Utilizado para quando há uma devolutiva do banco (Select)
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados

    } catch (error) {
        return false //Bug de programação.
    }


}

//Função para buscar uma música pelo ID
const selectByIDGravadora = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tb_gravadora where id = ${id}`

        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados

    } catch (error) {
        return false //Bug de programação.
    }

}

module.exports = {
    insertNovaGravadora,
    updateGravadora,
    deleteGravadora,
    selectAllGravadora,
    selectByIDGravadora
}