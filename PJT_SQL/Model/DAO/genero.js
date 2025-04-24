/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de gênero no BD           */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo gênero
const insertGenero = async function (genero) {
    try {
        let sql = `
            INSERT INTO tb_genero (
                nome
            ) VALUES (
                "${genero.nome}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar gênero
const updateGenero = async (id, dados) => {
    const sql = `UPDATE tb_genero SET nome = '${dados.nome}' WHERE id = ${id}`;
    const result = await prisma.$executeRawUnsafe(sql);
    return result;
};


// Deletar gênero
const deleteGenero = async (id) => {
    if (await generoDAO.selectGeneroByID(id)) {
        let result = await generoDAO.deleteGenero(id);
        if (result)
            return MESSAGE.DELETE_ITEM_SUCCESS;
        else
            return MESSAGE.ERROR_INTERNAL_SERVER;
    } else {
        return MESSAGE.ERROR_NOT_FOUND;
    }
}



// Listar todos os gêneros
const selectAllGeneros = async function () {
    try {
        let sql = `SELECT * FROM tb_genero ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Buscar gênero por ID
const selectByIdGenero = async function (id_genero) {
    try {
        let sql = `SELECT * FROM tb_genero WHERE id = ${id_genero}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
};
