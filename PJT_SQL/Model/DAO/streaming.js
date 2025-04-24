/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de streaming no BD       */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo streaming
const insertStreaming = async function (streaming) {
    try {
        let sql = `
            INSERT INTO tb_streaming (
                tipo,
                quantidade,
                link
            ) VALUES (
                "${streaming.tipo}",
                "${streaming.quantidade}",
                "${streaming.link}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar streaming
const updateStreaming = async function (streaming) {
    try {
        let sql = `
            UPDATE tb_streaming SET
                tipo = "${streaming.tipo}",
                quantidade = "${streaming.quantidade}",
                link = "${streaming.link}"
            WHERE id = ${streaming.id}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar streaming
const deleteStreaming = async function (id) {
    try {
        let sql = `DELETE FROM tb_streaming WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os streamings
const selectAllStreamings = async function () {
    try {
        let sql = `SELECT * FROM tb_streaming ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar streaming por ID
const selectByIdStreaming = async function (id) {
    try {
        let sql = `SELECT * FROM tb_streaming WHERE id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertStreaming,
    updateStreaming,
    deleteStreaming,
    selectAllStreamings,
    selectByIdStreaming
};
