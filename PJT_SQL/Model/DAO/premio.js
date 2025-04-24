/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de prêmio no BD          */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo prêmio
const insertPremio = async function (premio) {
    try {
        let sql = `
            INSERT INTO tb_premio (
                nome,
                categoria,
                ano
            ) VALUES (
                "${premio.nome}",
                "${premio.categoria}",
                ${premio.ano}
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar prêmio
const updatePremio = async function (premio) {
    try {
        let sql = `
            UPDATE tb_premio SET
                nome = "${premio.nome}",
                categoria = "${premio.categoria}",
                ano = ${premio.ano}
            WHERE id_premio = ${premio.id_premio}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar prêmio
const deletePremio = async function (id) {
    try {
        let sql = `DELETE FROM tb_premio WHERE id_premio = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os prêmios
const selectAllPremios = async function () {
    try {
        let sql = `SELECT * FROM tb_premio ORDER BY id_premio ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar prêmio por ID
const selectByIdPremio = async function (id_premio) {
    try {
        let sql = `SELECT * FROM tb_premio WHERE id_premio = ${id_premio}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertPremio,
    updatePremio,
    deletePremio,
    selectAllPremios,
    selectByIdPremio
};
