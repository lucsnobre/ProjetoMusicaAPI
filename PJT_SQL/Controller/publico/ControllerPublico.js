/****************************************************************************/
/* Objetivo: Controller das requisições de público na API                  */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const publicoModel = require('../../Model/DAO/publico');

// Listar todos os públicos
const listarPublicos = (req, res) => {
    publicoModel.selectAllPublicos()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum público encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar público por ID
const buscarPublico = (req, res) => {
    const id = req.params.id;
    publicoModel.selectByIdPublico(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Público não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo público
const criarPublico = (req, res) => {
    const novoPublico = req.body;
    publicoModel.insertPublico(novoPublico)
        .then(result => {
            if (result) res.status(201).json({ msg: "Público cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar público" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar público
const atualizarPublico = (req, res) => {
    const publico = req.body;
    publico.id_publico = req.params.id;

    publicoModel.updatePublico(publico)
        .then(result => {
            if (result) res.status(200).json({ msg: "Público atualizado com sucesso" });
            else res.status(404).json({ msg: "Público não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar público
const deletarPublico = (req, res) => {
    const id = req.params.id;
    publicoModel.deletePublico(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Público deletado com sucesso" });
            else res.status(404).json({ msg: "Público não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarPublicos,
    buscarPublico,
    criarPublico,
    atualizarPublico,
    deletarPublico
};
