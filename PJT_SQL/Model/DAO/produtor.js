/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de produtor no BD        */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo produtor
const insertProdutor = async function (produtor) {
    try {
        let sql = `
            INSERT INTO tb_produtor (
                nome,
                nacionalidade,
                data_nascimento
            ) VALUES (
                "${produtor.nome}",
                "${produtor.nacionalidade}",
                "${produtor.data_nascimento}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar produtor
const updateProdutor = async function (produtor) {
    try {
        let sql = `
            UPDATE tb_produtor SET
                nome = "${produtor.nome}",
                nacionalidade = "${produtor.nacionalidade}",
                data_nascimento = "${produtor.data_nascimento}"
            WHERE id = ${produtor.id}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar produtor
const deleteProdutor = async function (id) {
    try {
        let sql = `DELETE FROM tb_produtor WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os produtores
const selectAllProdutores = async function () {
    try {
        let sql = `SELECT * FROM tb_produtor ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar produtor por ID
const selectByIdProdutor = async function (id) {
    try {
        let sql = `SELECT * FROM tb_produtor WHERE id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertProdutor,
    updateProdutor,
    deleteProdutor,
    selectAllProdutores,
    selectByIdProdutor
};
