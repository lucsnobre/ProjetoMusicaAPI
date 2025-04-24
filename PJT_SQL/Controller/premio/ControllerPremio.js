/****************************************************************************/
/* Objetivo: Controller das requisições de prêmio na API                   */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const premioModel = require('../../Model/DAO/premio');

// Listar todos os prêmios
const listarPremios = (req, res) => {
    premioModel.selectAllPremios()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum prêmio encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar prêmio por ID
const buscarPremio = (req, res) => {
    const id = req.params.id;
    premioModel.selectByIdPremio(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Prêmio não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo prêmio
const criarPremio = (req, res) => {
    const novoPremio = req.body;
    premioModel.insertPremio(novoPremio)
        .then(result => {
            if (result) res.status(201).json({ msg: "Prêmio cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar prêmio" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar prêmio
const atualizarPremio = (req, res) => {
    const premio = req.body;
    premio.id_premio = req.params.id;

    premioModel.updatePremio(premio)
        .then(result => {
            if (result) res.status(200).json({ msg: "Prêmio atualizado com sucesso" });
            else res.status(404).json({ msg: "Prêmio não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar prêmio
const deletarPremio = (req, res) => {
    const id = req.params.id;
    premioModel.deletePremio(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Prêmio deletado com sucesso" });
            else res.status(404).json({ msg: "Prêmio não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarPremios,
    buscarPremio,
    criarPremio,
    atualizarPremio,
    deletarPremio
};
