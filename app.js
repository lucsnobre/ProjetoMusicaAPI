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

//Criando formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

app.use((request, response, next) =>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' )

    app.use(cors())
    next()
})

//Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){
    
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody)

    response.status(result.status_code)
    response.json(result)

    


})

app.listen(8080, function(){
        console.log('Servidor aguardando novas requisições...')
    })