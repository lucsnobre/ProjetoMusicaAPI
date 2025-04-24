/****************************************************************************/
/* Objetivo: Controller responsável pelas requisições de álbum na API       */
/* Data: 10/04/2025                                                         */
/* Autor: Cachorrada                                                        */
/* Versão: 1.0                                                              */
/****************************************************************************/

const albumModel = require('../../Model/DAO/album');

// Listar todos os álbuns
const listarAlbuns = (req, res) => {
    albumModel.selectAllAlbuns()
        .then(results => {
            if (!results) return res.status(404).json({ msg: "Nenhum álbum encontrado" });
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
};

// Buscar álbum por ID
const buscarAlbum = (req, res) => {
    const id = req.params.id;
    albumModel.selectByIdAlbum(id)
        .then(result => {
            if (!result) return res.status(404).json({ msg: "Álbum não encontrado" });
            res.status(200).json(result[0]);
        })
        .catch(err => res.status(500).json(err));
};

// Criar novo álbum
const criarAlbum = (req, res) => {
    const novoAlbum = req.body;
    albumModel.insertAlbum(novoAlbum)
        .then(result => {
            if (result) res.status(201).json({ msg: "Álbum cadastrado com sucesso" });
            else res.status(500).json({ msg: "Erro ao cadastrar álbum" });
        })
        .catch(err => res.status(500).json(err));
};

// Atualizar álbum
const atualizarAlbum = (req, res) => {
    const album = req.body;
    album.id_album = req.params.id;

    albumModel.updateAlbum(album)
        .then(result => {
            if (result) res.status(200).json({ msg: "Álbum atualizado com sucesso" });
            else res.status(404).json({ msg: "Álbum não encontrado ou erro ao atualizar" });
        })
        .catch(err => res.status(500).json(err));
};

// Deletar álbum
const deletarAlbum = (req, res) => {
    const id = req.params.id;
    albumModel.deleteAlbum(id)
        .then(result => {
            if (result) res.status(200).json({ msg: "Álbum deletado com sucesso" });
            else res.status(404).json({ msg: "Álbum não encontrado ou erro ao deletar" });
        })
        .catch(err => res.status(500).json(err));
};

module.exports = {
    listarAlbuns,
    buscarAlbum,
    criarAlbum,
    atualizarAlbum,
    deletarAlbum
};
