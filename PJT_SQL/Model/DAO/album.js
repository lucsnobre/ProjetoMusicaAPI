/****************************************************************************/
/* Objetivo: Model responsável pelo CRUD de dados de álbum no Banco de Dados */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir novo álbum
const insertAlbum = async function (album) {
    try {
        let sql = `
            INSERT INTO tb_album (
                nome_album,
                capa_album,
                data_lancamento,
                id_artista
            ) VALUES (
                "${album.nome_album}",
                "${album.capa_album}",
                "${album.data_lancamento}",
                ${album.id_artista}
            )`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Atualizar álbum
const updateAlbum = async function (album) {
    try {
        let sql = `
            UPDATE tb_album SET
                nome_album = "${album.nome_album}",
                capa_album = "${album.capa_album}",
                data_lancamento = "${album.data_lancamento}",
                id_artista = ${album.id_artista}
            WHERE id_album = ${album.id_album}`;

        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Deletar álbum
const deleteAlbum = async function (id) {
    try {
        let sql = `DELETE FROM tb_album WHERE id_album = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Listar todos os álbuns
const selectAllAlbuns = async function () {
    try {
        let sql = `SELECT * FROM tb_album ORDER BY id_album ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Buscar álbum por ID
const selectByIdAlbum = async function (id_album) {
    try {
        let sql = `SELECT * FROM tb_album WHERE id_album = ${id_album}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbuns,
    selectByIdAlbum
};
