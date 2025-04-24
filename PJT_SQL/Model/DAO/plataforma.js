/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de plataforma no BD      */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir nova plataforma
const insertPlataforma = async function (plataforma) {
    try {
        let sql = `
            INSERT INTO tb_plataforma (
                nome,
                empresa,
                pais_origem,
                logo
            ) VALUES (
                "${plataforma.nome}",
                "${plataforma.empresa}",
                "${plataforma.pais_origem}",
                "${plataforma.logo}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar plataforma
const updatePlataforma = async function (plataforma) {
    try {
        let sql = `
            UPDATE tb_plataforma SET
                nome = "${plataforma.nome}",
                empresa = "${plataforma.empresa}",
                logo = "${plataforma.pais_origem}",
                pais_origem = "${plataforma.logo}"
            WHERE id = ${plataforma.id}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar plataforma
const deletePlataforma = async function (id) {
    try {
        let sql = `DELETE FROM tb_plataforma WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todas as plataformas
const selectAllPlataformas = async function () {
    try {
        let sql = `SELECT * FROM tb_plataforma ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar plataforma por ID
const selectByIdPlataforma = async function (id) {
    try {
        let sql = `SELECT * FROM tb_plataforma WHERE id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataformas,
    selectByIdPlataforma
};
