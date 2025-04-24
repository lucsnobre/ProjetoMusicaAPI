/****************************************************************************/
/* Objetivo: Controller das requisições de gravadora na API                */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const gravadoraModel = require('../../Model/DAO/gravadora');

// Listar todas as gravadoras
const listarGravadoras = (req, res) => {
    gravadoraModel.selectAllGravadoras()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhuma gravadora encontrada" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar gravadora por ID
const buscarGravadora = (req, res) => {
    const id = req.params.id;
    gravadoraModel.selectByIdGravadora(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Gravadora não encontrada" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar nova gravadora
const criarGravadora = (req, res) => {
    const novaGravadora = req.body;
    gravadoraModel.insertGravadora(novaGravadora)
        .then(result => {
            if (result) res.status(201).json({ msg: "Gravadora cadastrada com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar gravadora" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar gravadora
const atualizarGravadora = (req, res) => {
    const gravadora = req.body;
    gravadora.id_gravadora = req.params.id;

    gravadoraModel.updateGravadora(gravadora)
        .then(result => {
            if (result) res.status(200).json({ msg: "Gravadora atualizada com sucesso" });
            else res.status(404).json({ msg: "Gravadora não encontrada ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar gravadora
const deletarGravadora = (req, res) => {
    const id = req.params.id;
    gravadoraModel.deleteGravadora(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Gravadora deletada com sucesso" });
            else res.status(404).json({ msg: "Gravadora não encontrada ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarGravadoras,
    buscarGravadora,
    criarGravadora,
    atualizarGravadora,
    deletarGravadora
};
