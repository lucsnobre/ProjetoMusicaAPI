/****************************************************************************/
/* Objetivo: Controller das requisições de produtor na API                 */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const produtorModel = require('../../Model/DAO/produtor');

// Listar todos os produtores
const listarProdutores = (req, res) => {
    produtorModel.selectAllProdutores()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum produtor encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar produtor por ID
const buscarProdutor = (req, res) => {
    const id = req.params.id;
    produtorModel.selectByIdProdutor(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Produtor não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo produtor
const criarProdutor = (req, res) => {
    const novoProdutor = req.body;
    produtorModel.insertProdutor(novoProdutor)
        .then(result => {
            if (result) res.status(201).json({ msg: "Produtor cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar produtor" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar produtor
const atualizarProdutor = (req, res) => {
    const produtor = req.body;
    produtor.id_produtor = req.params.id;

    produtorModel.updateProdutor(produtor)
        .then(result => {
            if (result) res.status(200).json({ msg: "Produtor atualizado com sucesso" });
            else res.status(404).json({ msg: "Produtor não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar produtor
const deletarProdutor = (req, res) => {
    const id = req.params.id;
    produtorModel.deleteProdutor(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Produtor deletado com sucesso" });
            else res.status(404).json({ msg: "Produtor não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarProdutores,
    buscarProdutor,
    criarProdutor,
    atualizarProdutor,
    deletarProdutor
};
