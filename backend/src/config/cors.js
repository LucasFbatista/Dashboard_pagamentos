//AQUI HABILITAMOS O CORS NA NOSSA APLICAÇÃO PARA ASSIM ACEITAR REQUISIÇÕES CRUZADAS
module.exports = function (req, res, next){

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}