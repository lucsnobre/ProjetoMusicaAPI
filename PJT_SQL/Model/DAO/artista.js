/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de artista no Banco de Dados */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo artista
const insertArtista = async function (artista) {
    try {
        let sql = `
            INSERT INTO tb_artista (
                nome,
                biografia,
                data_nascimento
            ) VALUES (
                "${artista.nome}",
                "${artista.biografia}",
                "${artista.data_nascimento}"
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar artista
const updateArtista = async function (artista) {
    try {
        let sql = `
            UPDATE tb_artista SET
                nome = "${artista.nome}",
                biografia = "${artista.biografia}",
                data_nascimento = "${artista.data_nascimento}"
            WHERE id = ${artista.id}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar artista
const deleteArtista = async function (id) {
    try {
        let sql = `DELETE FROM tb_artista WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os artistas
const selectAllArtistas = async function () {
    try {
        let sql = `SELECT * FROM tb_artista ORDER BY id ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar artista por ID
const selectByIdArtista = async function (id_artista) {
    try {
        let sql = `SELECT * FROM tb_artista WHERE id = ${id_artista}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtistas,
    selectByIdArtista
};
