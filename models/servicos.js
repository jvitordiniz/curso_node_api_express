//responsabilidade: envio dos dados ao BD, e definições de regras de negócio
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

    altera(id, valores, res){
        const sql = 'UPDATE SERVICOS SET ? WHERE Id = ?'

        conexao.query(sql, [valores, id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
        
    }
}


module.exports = new Servicos