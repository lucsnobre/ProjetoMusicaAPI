/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de público no BD         */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo público
const insertPublico = async function (publico) {
    try {
        let sql = `
            INSERT INTO tb_publico (
                faixa_etaria,
                descricao
            ) VALUES (
                "${publico.faixa_etaria}",
                "${publico.descricao}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar público
const updatePublico = async function (publico) {
    try {
        let sql = `
            UPDATE tb_publico SET
                faixa_etaria = "${publico.faixa_etaria}",
                descricao = "${publico.descricao}"
            WHERE id_publico = ${publico.id_publico}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar público
const deletePublico = async function (id) {
    try {
        let sql = `DELETE FROM tb_publico WHERE id_publico = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os públicos
const selectAllPublicos = async function () {
    try {
        let sql = `SELECT * FROM tb_publico ORDER BY id_publico ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar público por ID
const selectByIdPublico = async function (id_publico) {
    try {
        let sql = `SELECT * FROM tb_publico WHERE id_publico = ${id_publico}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertPublico,
    updatePublico,
    deletePublico,
    selectAllPublicos,
    selectByIdPublico
};
