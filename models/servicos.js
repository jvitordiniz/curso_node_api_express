//responsabilidade: envio dos dados ao BD
const conexao = require('../infra/conexao')
class Servicos{
    adiciona(servico){
        const descricao = servico.descricao
        const preco = servico.preco
        const sql = `INSERT INTO Servicos(servico, preco) values ('${descricao}', ${preco})`
        conexao.query(sql, servico, (erro, resultado)=>{
            if(erro){
                console.log(erro)
            }else{
                console.log(resultado)
            }
        })
    }
}


module.exports = new Servicos