/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de gravadora no BD       */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir nova gravadora
const insertGravadora = async function (gravadora) {
    try {
        let sql = `
            INSERT INTO tb_gravadora (
                nome,
                fundacao,
                sede
            ) VALUES (
                "${gravadora.nome}",
                "${gravadora.fundacao}",
                "${gravadora.sede}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar gravadora
const updateGravadora = async function (gravadora) {
    try {
        let sql = `
            UPDATE tb_gravadora SET
                nome = "${gravadora.nome}",
                sede = "${gravadora.sede}",
                fundacao = "${gravadora.fundacao}"
            WHERE id = ${gravadora.id}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar gravadora
const deleteGravadora = async function (id) {
    try {
        let sql = `DELETE FROM tb_gravadora WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todas as gravadoras
const selectAllGravadoras = async function () {
    try {
        let sql = `SELECT * FROM tb_gravadora ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar gravadora por ID
const selectByIdGravadora = async function (id) {
    try {
        let sql = `SELECT * FROM tb_gravadora WHERE id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertGravadora,
    updateGravadora,
    deleteGravadora,
    selectAllGravadoras,
    selectByIdGravadora
};
