//responsabilidade: controlar ações das rotas, e recebimento de novas requisições
const Atendimento =  require('../models/atendimentos')

module.exports = app =>{
    app.get('/atendimentos', (req,res)=>{
        res.send('Você está na rota de atendimentos realizando um GET')
    })
    app.post('/atendimentos', (req, res)=> {
        const atendimento =  req.body
        Atendimento.adiciona(atendimento)
        res.send('Você está na roda de atendimentos realizando um POST')
    })
}
