const port = 3003;

const bodyParser = require('body-parser')
const express = require('express');
const { modelNames } = require('mongoose');
const server = express()
const allowCors = require('./cors')
//AQUI IREMOS IMPORTA O EXPRESS QUERY INT QUE SERÁ RESPONSÁVEL POR CONVERTER
//O SKIP DA PAGINAÇÃO DOS NOS RESGISTROS RETORNADOS PELO MONGO O MESMO TAMBÉM TRABALHA COMO UM MIDDLEWARE
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`Servidor está rodando na porta ${port}`)
})

module.exports = server