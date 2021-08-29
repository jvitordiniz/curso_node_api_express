//responsabilidade: controlar ações das rotas, e recebimento de novas requisições
const Servico = require('../models/servicos')

module.exports = app =>{
    app.get('/servicos', (req,res)=>{
        res.send('Você está na rota de servicos realizando um GET')
    })
    app.post('/servicos', (req, res)=> {
        const servico =  req.body
        Servico.adiciona(servico)
        res.send('Você está na roda de servicos realizando um POST')
    })
    app.put('/servicos/:id', (req, res)=>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Servico.altera(id, valores, res)
    })
}
