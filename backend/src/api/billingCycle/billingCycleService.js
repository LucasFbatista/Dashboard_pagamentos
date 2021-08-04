const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')
const billingCycle = require('./billingCycle')


BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true})

//AQUI ENTES DA AÇÃO ACIONAMOS O MIDDLEWARE PARA FILTRA OS ERROS CASO ACONTEÇA
//E RETORNA AOS USUÁRIOS, SÓ ACIONAMOS PARA A OPÇÃO DE POST E PUT
billingCycle.after('post', errorHandler).after('put', errorHandler)


//PAGINATE ROUTE COUNT
//COMO ESTAMOS USANDO O RESGITER NO ARQUIVO ROUTES ELE AUTOMATICAMENTE ADICIONA QUALQUER ROTA
//QUE EU INCLUIR NA MINHA BillingCycle
//http://localhost:3003/api/billingCycles/count
BillingCycle.route('count', (req, res, next) => {

    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error] })
        }else{
            res.json({ value })
        }
    
    })
})

//ROTA DE AGREGAÇÃO DE VALORES TOTAIS DE DEBITOS E CREDITOS
//AGREGADORES DO PROPRIO MONGODB
BillingCycle.route('summary', (req, res, next) => {

    BillingCycle.aggregate({

        $project: { credit: { $sum: "$credits.value" }, debt:{ $sum: "$debts.value" } }
    },
    {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt"} }
    },
    {
        $project: { _id: 0, credit: 1, debt: 1 }
    }, (error, result) => {

        if(error){
            res.status(500).json({ errors: [error] })
        }else{

            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})



module.exports = BillingCycle