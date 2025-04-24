/****************************************************************************/
/* Objetivo: Controller responsável pelas requisições de plataforma na API */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const plataformaModel = require('../../Model/DAO/plataforma');

// Listar todas as plataformas
const listarPlataformas = (req, res) => {
    plataformaModel.selectAllPlataformas()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhuma plataforma encontrada" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar plataforma por ID
const buscarPlataforma = (req, res) => {
    const id = req.params.id;
    plataformaModel.selectByIdPlataforma(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Plataforma não encontrada" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar nova plataforma
const criarPlataforma = (req, res) => {
    const novaPlataforma = req.body;
    plataformaModel.insertPlataforma(novaPlataforma)
        .then(result => {
            if (result) res.status(201).json({ msg: "Plataforma cadastrada com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar plataforma" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar plataforma
const atualizarPlataforma = (req, res) => {
    const plataforma = req.body;
    plataforma.id_plataforma = req.params.id;

    plataformaModel.updatePlataforma(plataforma)
        .then(result => {
            if (result) res.status(200).json({ msg: "Plataforma atualizada com sucesso" });
            else res.status(404).json({ msg: "Plataforma não encontrada ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar plataforma
const deletarPlataforma = (req, res) => {
    const id = req.params.id;
    plataformaModel.deletePlataforma(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Plataforma deletada com sucesso" });
            else res.status(404).json({ msg: "Plataforma não encontrada ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarPlataformas,
    buscarPlataforma,
    criarPlataforma,
    atualizarPlataforma,
    deletarPlataforma
};
