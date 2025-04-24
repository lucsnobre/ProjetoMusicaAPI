/******************************************************************************
 * Objetivo: Controller CRUD de Artistas (sem chaves estrangeiras)
 * Data: 24/04/2025
 * Autor: Tropa do CRUD
 ******************************************************************************/

const MESSAGE = require('../../../Módulo/config');
const artistaDAO = require('../../Model/DAO/artista');

// Post
const criarArtista = async function (dados, contentType) {
    if (String(contentType).toLowerCase() !== 'application/json')
        return MESSAGE.ERROR_CONTENT_TYPE;

    const { nome, biografia, data_nascimento } = dados;

    if (!nome || nome.length > 100 ||
        !biografia || biografia.length > 300 ||
        !data_nascimento) {
        return MESSAGE.ERROR_REQUIRED_FIELDS;
    }

    const result = await artistaDAO.insertArtista(dados);
    return result ? MESSAGE.SUCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
};

// Get
const listarArtistas = async function () {
    const dados = await artistaDAO.selectAllArtistas();
    if (dados.length > 0) {
        return {
            status: true,
            status_code: 200,
            quantidade: dados.length,
            artistas: dados
        };
    } else {
        return MESSAGE.ERROR_NOT_FOUND;
    }
};

// Get
const buscarArtista = async function (id) {
    if (!id || isNaN(id)) return MESSAGE.ERROR_INVALID_ID;

    const dado = await artistaDAO.selectByIdArtista(id);
    return dado ? { status: true, status_code: 200, artista: dado } : MESSAGE.ERROR_NOT_FOUND;
};

// Insert
const atualizarArtista = async function (dados, id, contentType) {
    if (String(contentType).toLowerCase() !== 'application/json') {
        return MESSAGE.ERROR_CONTENT_TYPE;
    }
    if (!id || isNaN(id)) return MESSAGE.ERROR_INVALID_ID;

    const artistaExiste = await artistaDAO.selectByIdArtista(id);
    if (!artistaExiste) return MESSAGE.ERROR_NOT_FOUND;

    const { nome, biografia, data_nascimento } = dados;

    if (!nome || nome.length > 100 ||
        !biografia || biografia.length > 300 ||
        !data_nascimento) {
        return MESSAGE.ERROR_REQUIRED_FIELDS;
    }

    dados.id = id;
    const result = await artistaDAO.updateArtista(dados);
    return result ? MESSAGE.SUCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
};

// Delete
const deletarArtista = async function (id) {
    if (!id || isNaN(id)) return MESSAGE.ERROR_INVALID_ID;

    const artistaExiste = await artistaDAO.selectByIdArtista(id);
    if (!artistaExiste) return MESSAGE.ERROR_NOT_FOUND;

    const result = await artistaDAO.deleteArtista(id);
    return result ? MESSAGE.SUCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
};

module.exports = {
    criarArtista,
    listarArtistas,
    buscarArtista,
    atualizarArtista,
    deletarArtista
};
