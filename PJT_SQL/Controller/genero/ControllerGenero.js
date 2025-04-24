/****************************************************************************/
/* Objetivo: Controller responsável pelas requisições de gênero na API      */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const generoModel = require('../../Model/DAO/genero');

// Listar todos os gêneros
const listarGeneros = (req, res) => {
    generoModel.selectAllGeneros()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum gênero encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
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
const criarGenero = (req, res) => {
    const novoGenero = req.body;
    generoModel.insertGenero(novoGenero)
        .then(result => {
            if (result) res.status(201).json({ msg: "Gênero cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar gênero" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar gênero
const atualizarGenero = (req, res) => {
    const genero = req.body;
    genero.id_genero = req.params.id;

    generoModel.updateGenero(genero)
        .then(result => {
            if (result) res.status(200).json({ msg: "Gênero atualizado com sucesso" });
            else res.status(404).json({ msg: "Gênero não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar gênero
const deletarGenero = (req, res) => {
    const id = req.params.id;
    generoModel.deleteGenero(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Gênero deletado com sucesso" });
            else res.status(404).json({ msg: "Gênero não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarGeneros,
    buscarGenero,
    criarGenero,
    atualizarGenero,
    deletarGenero
};
