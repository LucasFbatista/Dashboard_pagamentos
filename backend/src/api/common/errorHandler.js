const _ = require('lodash')


//OS ERROS EM RES.LOCALS.BUNDLE É O PROPRIO NODE-RESTFUL QUE COLOCA
//AQUI IREMOS TRATALOS PARA QUE SEJA RETORNADO DE FORMA MAIS AGRADAVEL AO USUÁRIO


//MIDDLEWARE DE FILTRO DE ERROS
module.exports = (req, res, next) => {

    const bundle = res.locals.bundle

    if(bundle.errors){
        const errors = parserErrors(bundle.errors)
        res.status(500).json({errors})
    }else{
        next()
    }
}

const parserErrors = nodeRestfulErrors => {

    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors

}