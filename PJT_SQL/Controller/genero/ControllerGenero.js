/****************************************************************************/
/* Objetivo: Controller responsável pelas requisições de gênero na API      */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const MESSAGE = require('../../../Módulo/config');
const generoModel = require('../../Model/DAO/genero');

// Listar todos os gêneros
const listarGeneros = async () => {
    try {
        const dados = await generoModel.selectAllGeneros();

        if (dados && dados.length > 0) {
            return { status_code: 200, generos: dados };
        } else {
            return { status_code: 404, msg: "Nenhum gênero encontrado" };
        }
    } catch (error) {
        return { status_code: 500, msg: "Erro ao listar gêneros", error: error.message };
    }
};

// Buscar gênero por ID
const buscarGenero = (req, res) => {
    const id = req.params.id;
    generoModel.selectByIdGenero(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Gênero não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo gênero
const criarGenero = async (novoGenero) => {
    try {
        const result = await generoModel.insertGenero(novoGenero);

        if (result) {
            return {
                status_code: 201,
                message: 'Gênero cadastrado com sucesso',
                dados: result
            };
        } else {
            return {
                status_code: 500,
                message: 'Erro ao cadastrar gênero'
            };
        }
    } catch (error) {
        console.error('Erro ao criar gênero:', error);
        return {
            status_code: 500,
            message: 'Erro interno no servidor',
            error
        };
    }
};






// Atualizar gênero
const atualizarGenero = async (id, dadosGenero) => {
    try {
        if (!id || isNaN(id))
            return { status_code: 400, msg: "ID inválido" };

        if (!dadosGenero.nome || dadosGenero.nome.trim() === '')
            return { status_code: 400, msg: "Nome do gênero é obrigatório" };

        const generoExistente = await generoModel.selectByIdGenero(id);
        if (!generoExistente || generoExistente.length === 0)
            return { status_code: 404, msg: "Gênero não encontrado" };

        const result = await generoModel.updateGenero(id, dadosGenero);

        if (result)
            return { status_code: 200, msg: "Gênero atualizado com sucesso" };
        else
            return { status_code: 500, msg: "Erro ao atualizar o gênero" };

    } catch (error) {
        return { status_code: 500, msg: "Erro no servidor", error: error.message };
    }
};


// Deletar gênero
const deletarGenero = async function (id) {
    if (!id || isNaN(id)) {
        return MESSAGE.ERROR_INVALID_ID;
    }

    let idGenero = await generoModel.selectByIdGenero(id);

    if (idGenero) {
        let result = await generoModel.deleteGenero(id);

        if (result)
            return MESSAGE.SUCCESS_DELETED_ITEM;
        else
            return MESSAGE.ERROR_INTERNAL_SERVER;
    } else {
        return MESSAGE.ERROR_NOT_FOUND;
    }
};


module.exports = {
    listarGeneros,
    buscarGenero,
    criarGenero,
    atualizarGenero,
    deletarGenero
};
