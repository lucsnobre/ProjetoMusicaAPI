// Controller para Artistas
const artistaModel = require('../../Model/DAO/artista');

const listarArtistas = (req, res) => {
    artistaModel.selectAllArtista().then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json({ msg: 'Nenhum artista encontrado.' });
    }).catch(() => res.status(500).json({ msg: 'Erro interno no servidor.' }));
};

const buscarArtista = (req, res) => {
    const id = req.params.id;
    artistaModel.selectByIdArtista(id).then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json({ msg: 'Artista não encontrado.' });
    }).catch(() => res.status(500).json({ msg: 'Erro interno no servidor.' }));
};

const criarArtista = (req, res) => {
    const novoArtista = req.body;
    artistaModel.insertArtista(novoArtista).then((result) => {
        if (result) res.status(201).json({ msg: 'Artista criado com sucesso.' });
        else res.status(400).json({ msg: 'Erro ao criar artista.' });
    }).catch(() => res.status(500).json({ msg: 'Erro interno no servidor.' }));
};

const deletarArtista = (req, res) => {
    const id = req.params.id;
    artistaModel.deleteArtista(id).then((result) => {
        if (result) res.status(200).json({ msg: 'Artista deletado com sucesso.' });
        else res.status(404).json({ msg: 'Artista não encontrado.' });
    }).catch(() => res.status(500).json({ msg: 'Erro interno no servidor.' }));
};

module.exports = {
    listarArtistas,
    buscarArtista,
    criarArtista,
    deletarArtista
};


// DAO - artista.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertArtista = async (artista) => {
    try {
        let sql = `INSERT INTO tb_artista (nome_artista, genero, foto) VALUES ("${artista.nome_artista}", "${artista.genero}", "${artista.foto}")`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

const updateArtista = async (artista) => {
    try {
        let sql = `UPDATE tb_artista SET nome_artista = '${artista.nome_artista}', genero = '${artista.genero}', foto = '${artista.foto}' WHERE id_artista = ${artista.id_artista}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

const deleteArtista = async (id) => {
    try {
        let sql = `DELETE FROM tb_artista WHERE id_artista = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        return false;
    }
};

const selectAllArtista = async () => {
    try {
        let sql = `SELECT * FROM tb_artista ORDER BY id_artista ASC`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result ? result : false;
    } catch (error) {
        return false;
    }
};

const selectByIdArtista = async (id) => {
    try {
        let sql = `SELECT * FROM tb_artista WHERE id_artista = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result && result.length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
};
