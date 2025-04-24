/****************************************************************************/
/* Objetivo: Controller responsável pelas requisições de streaming na API   */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const streamingModel = require('../../Model/DAO/streaming');

// Listar todos os streamings
const listarStreamings = (req, res) => {
    streamingModel.selectAllStreamings()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum streaming encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar streaming por ID
const buscarStreaming = (req, res) => {
    const id = req.params.id;
    streamingModel.selectByIdStreaming(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Streaming não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo streaming
const criarStreaming = (req, res) => {
    const novoStreaming = req.body;
    streamingModel.insertStreaming(novoStreaming)
        .then(result => {
            if (result) res.status(201).json({ msg: "Streaming cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar streaming" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar streaming
const atualizarStreaming = (req, res) => {
    const streaming = req.body;
    streaming.id_streaming = req.params.id;

    streamingModel.updateStreaming(streaming)
        .then(result => {
            if (result) res.status(200).json({ msg: "Streaming atualizado com sucesso" });
            else res.status(404).json({ msg: "Streaming não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar streaming
const deletarStreaming = (req, res) => {
    const id = req.params.id;
    streamingModel.deleteStreaming(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Streaming deletado com sucesso" });
            else res.status(404).json({ msg: "Streaming não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarStreamings,
    buscarStreaming,
    criarStreaming,
    atualizarStreaming,
    deletarStreaming
};
