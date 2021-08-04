const server = require('./config/server')
require('./config/database')
//AQUI ESTAMOS PASSSANDO O SERVER VIA PARAMETRO PARA ROUTES
require('./config/routes')(server)