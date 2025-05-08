/******************************************************************************/
/*Objetivo: API responsável pelas requisições do projeto de controle de música*/
/*Data: 13/02/2024                                                            */
/*Autor: Cachorrada                                                           */
/*Versão: 1.0                                                                 */
/*Observações: Para criar a API, precisamos instalar:                         */
/*                                                                            */
/*   express       npm install express --save                                 */
/*   cors          npm install cors --save                                    */
/*   body-parser   npm install body-parser --save                             */
/*Para criar a conexão com o Banco de Dados MYSQL precisamos instalar:        */
/*                                                                            */
/*   prisma        npm install prisma --save                                  */
/*   prisma client npm install @prisma/client --save                          */
/*                                                                            */
/*   Após a instalação do prisma é necessário inicializar o prisma: npx prisma init                                                                          */
/*     
/*   Para sincronizar o prisma com o banco de dados podemos utilizar: npx prisma migrate dev
/*
/*                                                                            */
/******************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')




const controllerMusica = require('./PJT_SQL/Controller/musica/controllerMusica')
const controllerArtista = require('./PJT_SQL/Controller/artista/ControllerArtista')
const controllerAlbum = require('./PJT_SQL/Controller/album/ControllerAlbum')
const controllerGenero = require('./PJT_SQL/Controller/genero/ControllerGenero')
const controllerGravadora = require('./PJT_SQL/Controller/gravadora/ControllerGravadora')

//Criando formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()
app.use(express.json());  // Para JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((request, response, next) =>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' )

    app.use(cors())
    next()
})

//Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe content-type da requisição para validar o formato de dados.
    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    


})

//Endpoint para retornar uma lista de músicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){
    //Chama a função pra retornar uma lista de músicas
    let result = await controllerMusica.listarMusica()
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/controle-musicas/musica/:search_id/', cors(), async function(request, response) {
    // Pega o ID da música da URL
    let searchId = request.params.search_id;

    // Chama a função de buscar música com o ID fornecido
    let result = await controllerMusica.buscarMusica(searchId);

    // Retorna o resultado
    response.status(result.status_code);
    response.json(result);
});


app.delete('/v1/controle-musicas/musica/', cors(), async function(request, response) {

    let result = await controllerMusica.excluirMusica()

    if (result && result.status_code) {
        response.status(result.status_code)
        response.json(result)
    } else {
        response.status(500).json({ error: "Erro interno no servidor" })
    }
})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID da Música
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Artistas

app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe content-type da requisição para validar o formato de dados.
    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerArtista.criarArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    


})

app.get('/v1/controle-musicas/artista', cors(), async function (request, response) {
    let result = await controllerArtista.listarArtistas()

    if (result && result.status_code) {
        response.status(result.status_code)
        response.json(result)
    } else {
        response.status(500).json({ error: "Erro ao listar artistas." })
    }
})

app.get('/v1/controle-musicas/artista/:id', cors(), async function (request, response) {
    let id = request.params.id;
    let result = await controllerArtista.buscarArtista(id);

    response.status(result.status_code);
    response.json(result);
});

app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response) {
    const id = request.params.id;  // Pega o ID da URL

    // Chama a função de exclusão do artista no controlador
    let result = await controllerArtista.deletarArtista(id);

    // Verifica o resultado e responde com o status adequado
    if (result && result.status_code) {
        response.status(result.status_code);
        response.json(result);
    } else {
        response.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response) {
    const id = request.params.id; // Recebe o ID do artista
    const dadosBody = request.body; // Recebe os dados do corpo da requisição
    const contentType = request.headers['content-type']; // Recebe o content-type da requisição

    let result = await controllerArtista.atualizarArtista(dadosBody, id, contentType); // Chama a função de atualizar

    response.status(result.status_code); // Define o status da resposta
    response.json(result); // Retorna o resultado da operação
});


//Álbum
// Rota POST para criar álbum
app.post('/v1/controle-musicas/album', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await controllerAlbum.inserirAlbum(dadosBody, contentType);

    response.status(result.status_code);
    response.json(result);
});

app.get('/v1/controle-musicas/album', cors(), async function (request, response) {
    let result = await controllerAlbum.listarAlbum()
    console.log("RESULTADO DO CONTROLLER:", result)

    if (result && result.status_code) {
        response.status(result.status_code)
        response.json(result)
    } else {
        response.status(500).json({ error: "Erro ao listar álbuns." })
    }
    
})

// Rota GET para buscar álbum por ID
app.get('/v1/controle-musicas/album/:id', cors(), async function(request, response) {
    let id = request.params.id;
    let result = await controllerAlbum.listarAlbum(id);

    response.status(result.status_code);
    response.json(result);
});

// Atualizar álbum
app.put('/v1/controle-musicas/album/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type'];
    let id = request.params.id;
    let dadosBody = request.body;

    let result = await controllerAlbum.atualizarAlbum(dadosBody, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

// DELETE 
app.delete('/v1/controle-musicas/album/:id', cors(), async function(request, response) {
    const id = request.params.id;
    let result = await controllerAlbum.deletarAlbum(id);

    response.status(result.status_code);
    response.json(result);
});

// Gênero

// Rota POST para criar gênero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function (req, res) {
    try {
        const novoGenero = req.body;  // Pega os dados do corpo da requisição

        // Verifica se o nome do gênero foi fornecido
        if (!novoGenero || !novoGenero.nome) {
            return res.status(400).json({ msg: "Nome do gênero é obrigatório" });
        }

        // Chama a função de inserção no modelo
        const result = await controllerGenero.criarGenero(novoGenero);

        // Verifica se o gênero foi inserido com sucesso
        if (result) {
            return res.status(201).json({ msg: "Gênero cadastrado com sucesso" });
        } else {
            return res.status(500).json({ msg: "Erro ao cadastrar gênero" });
        }
    } catch (err) {
        // Captura qualquer erro e retorna um erro 500
        console.error(err);
        return res.status(500).json({ msg: "Erro interno", error: err });
    }
});

app.get('/v1/controle-musicas/genero', cors(), async function (request, response) {
    let result = await controllerGenero.listarGeneros();

    response.status(result.status_code);
    response.json(result);
});

app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    const id = request.params.id;
    const dados = request.body;

    const result = await controllerGenero.atualizarGenero(id, dados);

    response.status(result.status_code);
    response.json(result);
});

app.delete('/v1/controle-musicas/genero/:id', async function (request, response) {
    let idGenero = request.params.id;
    let result = await controllerGenero.deletarGenero(idGenero);
    response.status(result.status_code).json(result);
});

//Gravadora
app.post('/v1/controle-musicas/gravadora', cors(), bodyParserJSON, async (request, response) => {
    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() === 'application/json') {
        let dadosBody = request.body;

        let result = await controllerGravadora.inserirGravadora(dadosBody);

        response.status(result.status_code).json(result);
    } else {
        response.status(415).json({ status: false, message: 'Tipo de conteúdo não suportado.' });
    }
});







//app.post('/v1/controle-muscias/genero', cors() async function (request, response) {
    //const id = reque
//})


app.listen(8080, function(){
        console.log('Nike Air Max 95 Triple White')
    })